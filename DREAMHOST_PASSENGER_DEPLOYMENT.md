# 🚀 Dreamhost Deployment with Passenger (Node.js)

## Overview
Dreamhost supports Node.js applications through Phusion Passenger on shared hosting! This means we can deploy the full Next.js application without converting to static files.

## Prerequisites
- Dreamhost shared hosting with Passenger enabled
- SSH access enabled in Dreamhost panel
- Node.js domain configured in Dreamhost panel

---

## 🔧 Dreamhost Panel Configuration

### 1. Enable Passenger for your domain
1. Go to Dreamhost Panel → Domains → Manage Domains
2. Click "Edit" on your domain
3. Under "Web Options":
   - Check "Passenger (Ruby/NodeJS/Python apps)"
   - Set "Run this domain under the user:" to your SSH user
4. Save changes

### 2. Configure Node.js application
1. In Dreamhost Panel → Domains → Manage Domains
2. Click "Edit" on your domain
3. Set the "Web directory" to: `/home/username/multipasslabs.com/public`
4. Save and wait for DNS propagation

---

## 📁 Required File Structure

```
/home/username/multipasslabs.com/
├── app.js                 # Passenger entry point (we'll create this)
├── public/               # Document root (Passenger serves from here)
│   └── .htaccess        # Apache configuration
├── .env.production      # Environment variables
├── package.json         # Node dependencies
├── next.config.mjs      # Next.js configuration
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                 # Utilities
├── styles/              # CSS files
├── prisma/              # Database schema
└── tmp/                 # Passenger temp files (auto-created)
    └── restart.txt      # Touch this to restart app
```

---

## 🚀 Deployment Steps

### Step 1: Prepare the Application

Create `app.js` (Passenger entry point):
```javascript
// app.js - Passenger entry point for Next.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

Update `package.json`:
```json
{
  "name": "multipasslabs",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "NODE_ENV=production node app.js",
    "start:passenger": "NODE_ENV=production node app.js",
    "lint": "next lint",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate deploy"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Step 2: SSH Deployment

```bash
# 1. SSH into Dreamhost
ssh username@dreamhost.com

# 2. Navigate to your domain directory
cd ~/multipasslabs.com

# 3. Clone your repository (or upload files)
git clone https://github.com/yourusername/multipasslabs.git .
# OR use SFTP to upload files

# 4. Install Node.js dependencies
npm ci --production=false  # Need dev deps for build

# 5. Create production environment file
nano .env.production
```

### Step 3: Environment Variables

Create `.env.production`:
```env
# Application
NODE_ENV=production
NEXTAUTH_URL=https://multipasslabs.com

# Database (use Dreamhost MySQL)
DATABASE_URL="mysql://username:password@mysql.dreamhost.com:3306/database_name"

# Authentication
NEXTAUTH_SECRET=your-secret-key-here

# Stripe (if needed)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Optional: External services
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=
```

### Step 4: Build and Deploy

```bash
# 1. Build the Next.js application
npm run build

# 2. Run database migrations (if using Dreamhost MySQL)
npm run db:migrate

# 3. Create/update .htaccess in public directory
mkdir -p public
nano public/.htaccess
```

Create `public/.htaccess`:
```apache
# Passenger configuration
PassengerEnabled on
PassengerAppRoot /home/username/multipasslabs.com
PassengerAppType node
PassengerStartupFile app.js
PassengerNodejs /home/username/.nvm/versions/node/v18.17.0/bin/node

# Environment
PassengerAppEnv production

# Performance
PassengerMinInstances 1
PassengerMaxPoolSize 2

# Restart by touching tmp/restart.txt
PassengerRestartDir tmp
```

### Step 5: Start the Application

```bash
# 1. Create restart directory
mkdir -p tmp

# 2. Restart Passenger (anytime you need to restart)
touch tmp/restart.txt

# 3. Check if running
curl -I http://yourdomain.com
```

---

## 🔄 Continuous Deployment

### Option 1: Git Hook Deployment
```bash
# On Dreamhost, create a deployment script
nano ~/deploy.sh
```

```bash
#!/bin/bash
cd ~/multipasslabs.com
git pull origin main
npm ci --production=false
npm run build
npm run db:migrate
touch tmp/restart.txt
echo "Deployment complete!"
```

### Option 2: GitHub Actions
```yaml
name: Deploy to Dreamhost

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Dreamhost
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DREAMHOST_HOST }}
          username: ${{ secrets.DREAMHOST_USER }}
          key: ${{ secrets.DREAMHOST_SSH_KEY }}
          script: |
            cd ~/multipasslabs.com
            git pull origin main
            npm ci --production=false
            npm run build
            touch tmp/restart.txt
```

---

## 🐛 Troubleshooting

### Check Passenger Status
```bash
# View Passenger processes
passenger-status

# View application logs
tail -f ~/logs/yourdomain.com/http/error.log

# Check Node.js version
node --version

# Passenger memory usage
passenger-memory-stats
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 503 Service Unavailable | Check `error.log`, ensure `app.js` exists |
| Cannot find module | Run `npm ci` to install dependencies |
| Database connection failed | Verify DATABASE_URL in `.env.production` |
| Memory limit exceeded | Reduce PassengerMaxPoolSize in .htaccess |
| Application won't restart | `touch tmp/restart.txt` or `pkill -f Passenger` |

### Performance Optimization
```apache
# Add to .htaccess for better performance
PassengerMaxRequests 500
PassengerStatThrottleRate 10
PassengerHighPerformance on

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access 1 year"
  ExpiresByType image/png "access 1 year"
  ExpiresByType text/css "access 1 month"
  ExpiresByType application/javascript "access 1 month"
</IfModule>
```

---

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Test build locally: `npm run build`
- [ ] Verify all environment variables are set
- [ ] Database connection string ready
- [ ] SSL certificate configured in Dreamhost panel

### Deployment
- [ ] Upload files via Git or SFTP
- [ ] Install dependencies: `npm ci`
- [ ] Build application: `npm run build`
- [ ] Set up environment variables
- [ ] Configure .htaccess
- [ ] Create tmp directory
- [ ] Restart Passenger

### Post-deployment (from CLAUDE.md)
- [ ] Test all entity attributions
- [ ] Verify audio works across browsers
- [ ] Check mobile terminal experience
- [ ] Performance audit (target <2s load)
- [ ] Accessibility for screen readers
- [ ] Test startup intro animation
- [ ] Verify all pages load
- [ ] Check console for errors

---

## 🎯 Dreamhost-Specific Considerations

### Advantages
- ✅ Full Node.js support with Passenger
- ✅ No need for static export
- ✅ Supports server-side rendering
- ✅ Can use API routes
- ✅ Database included (MySQL)
- ✅ Persistent file storage

### Limitations
- ⚠️ Limited memory on shared hosting (usually 512MB-1GB)
- ⚠️ CPU throttling on shared plans
- ⚠️ No WebSocket support on shared hosting
- ⚠️ Passenger restarts app after inactivity
- ⚠️ No PM2 or custom process managers

### Optimization Tips
1. Use production builds only
2. Implement caching strategies
3. Optimize images (use Next.js Image component)
4. Minimize server-side computations
5. Use CDN for static assets
6. Consider upgrading to VPS if traffic grows

---

## 🚨 Important Notes

1. **Database**: Use Dreamhost's MySQL instead of PostgreSQL
   - Update Prisma schema to use MySQL provider
   - Adjust queries if needed

2. **File Uploads**: Store in Dreamhost directories or use external service (S3, Cloudinary)

3. **Email**: Use Dreamhost's SMTP or external service (SendGrid, Mailgun)

4. **Monitoring**: Set up uptime monitoring (UptimeRobot, Pingdom)

5. **Backups**: Enable automatic backups in Dreamhost panel

---

## 🆘 Support Resources

- [Dreamhost Passenger Documentation](https://help.dreamhost.com/hc/en-us/articles/217185397-Node-js-overview)
- [Passenger Generic Documentation](https://www.phusionpassenger.com/docs/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- Dreamhost Support: support@dreamhost.com

---

## Success! 🎉
Your Next.js app should now be running on Dreamhost with full Node.js support via Passenger!
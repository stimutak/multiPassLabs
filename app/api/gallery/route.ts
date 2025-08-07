import { NextRequest, NextResponse } from 'next/server';
import { LAB_ENTITIES, getRandomEntity } from '@/lib/entities';

// Mock gallery data for now (no database required)
const mockGalleryItems = [
  {
    id: '1',
    title: 'Reality Mesh #001',
    slug: 'reality-mesh-001',
    type: 'image',
    mediaUrl: '/placeholder-1.jpg',
    description: 'First experiment in reality mesh compilation',
    featured: true,
    entityId: LAB_ENTITIES[0].id,
    tags: ['glitch', 'mesh', 'experimental'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Quantum Tunnel Visualization',
    slug: 'quantum-tunnel-viz',
    type: 'video',
    mediaUrl: '/placeholder-2.mp4',
    description: 'Mapping interdimensional data streams',
    featured: false,
    entityId: LAB_ENTITIES[1].id,
    tags: ['quantum', 'visualization', 'data'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Glitch Pattern Alpha',
    slug: 'glitch-pattern-alpha',
    type: 'interactive',
    mediaUrl: '/interactive-1',
    description: 'Interactive glitch generation system',
    featured: true,
    entityId: LAB_ENTITIES[2].id,
    tags: ['interactive', 'glitch', 'generative'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const type = searchParams.get('type');
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Filter mock data based on query params
    let items = [...mockGalleryItems];
    
    if (featured) {
      items = items.filter(item => item.featured);
    }
    
    if (type) {
      items = items.filter(item => item.type === type);
    }
    
    if (entityId) {
      items = items.filter(item => item.entityId === entityId);
    }
    
    // Limit results
    items = items.slice(0, limit);

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const entity = getRandomEntity();
    
    const newItem = {
      id: Math.random().toString(36).substring(7),
      ...body,
      entityId: body.entityId || entity.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In a real app, save to database
    mockGalleryItems.push(newItem);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}
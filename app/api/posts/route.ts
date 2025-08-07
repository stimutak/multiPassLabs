import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getRandomEntity } from '@/lib/entities';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const published = searchParams.get('published') !== 'false'; // Default to true
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const posts = await db.post.findMany({
      where: {
        ...(featured && { featured: true }),
        published,
        ...(entityId && { entityId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, slug, featured, published, tags, entityId } = body;

    // Assign random entity if not provided
    const assignedEntityId = entityId || getRandomEntity().id;

    const post = await db.post.create({
      data: {
        title,
        content,
        excerpt,
        slug,
        featured: featured || false,
        published: published || false,
        tags: tags || [],
        entityId: assignedEntityId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getRandomEntity } from '@/lib/entities';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const type = searchParams.get('type');
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    const items = await db.galleryItem.findMany({
      where: {
        ...(featured && { featured: true }),
        ...(type && { type }),
        ...(entityId && { entityId }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

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
    const { title, description, imageUrl, videoUrl, type, featured, tags, entityId } = body;

    // Assign random entity if not provided
    const assignedEntityId = entityId || getRandomEntity().id;

    const item = await db.galleryItem.create({
      data: {
        title,
        description,
        imageUrl,
        videoUrl,
        type,
        featured: featured || false,
        tags: tags || [],
        entityId: assignedEntityId,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { LAB_ENTITIES, getRandomEntity } from '@/lib/entities';

// Mock posts data for now (no database required)
const mockPosts = [
  {
    id: '1',
    title: 'Initializing Collective Consciousness',
    slug: 'initializing-collective',
    content: 'The mesh is compiling. Reality streams converge at quantum junction points...',
    excerpt: 'First transmission from the collective',
    featured: true,
    published: true,
    entityId: LAB_ENTITIES[0].id,
    tags: ['initialization', 'collective', 'transmission'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Glitch Patterns in Reality Mesh',
    slug: 'glitch-patterns',
    content: 'Observing temporal distortions in the reality compilation process...',
    excerpt: 'Analysis of glitch phenomena',
    featured: false,
    published: true,
    entityId: LAB_ENTITIES[1].id,
    tags: ['glitch', 'analysis', 'mesh'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Audio-Reactive Neural Pathways',
    slug: 'audio-reactive-neural',
    content: 'Mapping sound frequencies to consciousness streams...',
    excerpt: 'Experimental audio-visual synthesis',
    featured: true,
    published: true,
    entityId: LAB_ENTITIES[2].id,
    tags: ['audio', 'neural', 'experimental'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Filter mock data based on query params
    let posts = [...mockPosts];
    
    if (featured) {
      posts = posts.filter(post => post.featured);
    }
    
    if (entityId) {
      posts = posts.filter(post => post.entityId === entityId);
    }
    
    // Limit results
    posts = posts.slice(0, limit);

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
    const entity = getRandomEntity();
    
    const newPost = {
      id: Math.random().toString(36).substring(7),
      ...body,
      entityId: body.entityId || entity.id,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // In a real app, save to database
    mockPosts.push(newPost);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
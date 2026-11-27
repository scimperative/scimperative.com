export type Pillar = 'sandbox' | 'workshop' | 'library';
export type EntityType = 'MOD' | 'EXP' | 'NTE' | 'STD' | 'RPT';

export interface Thread {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface Entity {
  id: string;
  slug: string;
  title: string;
  date: string;
  pillar: Pillar;
  type: EntityType;
  thread_id: string;
  tags: string[];
  links: string[];
  status: 'published' | 'draft';
  summary: string;
  externalUrl?: string;
  sandboxModuleId?: string;
  workshopDetails?: {
    prediction: string;
    measured: string;
    gap: string;
  };
}

export interface SearchIndexItem {
  id: string;
  title: string;
  summary: string;
  thread: string;
  thread_slug: string;
  tags: string[];
  links: string[];
  url: string;
  pillar: Pillar;
}

export const THREADS: readonly Thread[] = [
  {
    id: 'THD-ORBITAL-COMPUTE',
    slug: 'orbital-ai-compute',
    title: 'Orbital AI Compute',
    description:
      'First-principles thermal rejection, solar power budgets, and radiation constraints for space-based compute.',
    tags: ['orbital', 'thermal', 'solar', 'radiators', 'power-budget'],
    featured: true,
  },
  {
    id: 'THD-EDGE-COST',
    slug: 'edge-ai-physical-constraints',
    title: 'Edge AI Physical Constraints',
    description:
      'Hands-on hardware measurements, thermal envelopes, and real-world throughput limits for edge inference.',
    tags: ['edge', 'computer-vision', 'hailo-8l', 'raspberry-pi'],
    featured: true,
  },
  {
    id: 'THD-INTELLIGENCE-PHYSICAL',
    slug: 'intelligence-physical-limits',
    title: 'Physical Limits of Intelligence',
    description:
      'Bandwidth, hardware resilience, and the physical boundaries governing intelligent systems.',
    tags: ['radiation', 'llm', 'reliability', 'bandwidth'],
    featured: true,
  },
];

export const ENTITIES: readonly Entity[] = [
  {
    id: 'WKS-EXP-001',
    slug: 'hailo-expectation-calibration',
    title: 'Is the Raspberry Pi AI HAT+ (Hailo-8L) good for AI?',
    date: '2026-11-15',
    pillar: 'workshop',
    type: 'EXP',
    thread_id: 'THD-EDGE-COST',
    tags: ['edge', 'computer-vision', 'hailo-8l', 'raspberry-pi'],
    links: [],
    status: 'published',
    summary:
      'One Raspberry Pi 5 with the AI HAT+ (Hailo-8L, 13 TOPS): strong for CNN vision (~100 FPS), Whisper-tiny runs on the HAT (~0.19 RTF), and LLMs are unsupported on the 8L chip (running on CPU at 14.3 tok/s).',
    externalUrl:
      'https://github.com/scimperative/workshop/tree/main/01-hailo-expectation-calibration',
    workshopDetails: {
      prediction:
        'YOLOv8n 99 FPS end-to-end, limited by the host CPU; Llama-3.2-1B on CPU 11 tok/s',
      measured:
        'YOLOv8n 100.6 FPS end-to-end (107.4 model-only, 7.2% of rated TOPS), Whisper-tiny on HAT (~0.19 RTF on 3 test clips), Llama-3.2-1B on CPU 14.3 tok/s',
      gap: 'FPS within 2%; bottleneck call wrong (host CPU predicted, NPU-side measured); LLM speed +30%',
    },
  },
  {
    id: 'SBX-MOD-001',
    slug: 'orbital-thermal-limits',
    title: 'Orbital Thermal Limits',
    date: '2026-10-23',
    pillar: 'sandbox',
    type: 'MOD',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'thermal', 'radiators'],
    links: ['LIB-STD-001', 'LIB-NTE-001', 'LIB-NTE-002'],
    status: 'published',
    summary:
      'Interactive radiative heat-rejection model for orbital compute payloads, balancing radiator area, emissivity, sink temperature, and waste heat.',
    sandboxModuleId: 'orbital-thermal-limits',
  },
  {
    id: 'SBX-MOD-002',
    slug: 'solar-power-budget',
    title: 'Solar Power Budget',
    date: '2026-11-08',
    pillar: 'sandbox',
    type: 'MOD',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'solar', 'power-budget'],
    links: ['LIB-STD-002', 'LIB-NTE-003'],
    status: 'published',
    summary:
      'Orbital solar collection and eclipse duty-cycle calculator comparing space-based irradiance against terrestrial baselines.',
    sandboxModuleId: 'solar-power-budget',
  },
  {
    id: 'SBX-MOD-003',
    slug: 'llm-bitflip-resilience',
    title: 'LLM Bitflip Resilience',
    date: '2026-11-12',
    pillar: 'sandbox',
    type: 'MOD',
    thread_id: 'THD-INTELLIGENCE-PHYSICAL',
    tags: ['radiation', 'llm', 'reliability'],
    links: ['LIB-NTE-005'],
    status: 'published',
    summary:
      'Interactive model exploring single-event upset (SEU) bitflip rates and numerical sensitivity in quantized neural network weights.',
    sandboxModuleId: 'llm-bitflip-resilience',
  },
  {
    id: 'LIB-STD-002',
    slug: 'does-orbit-give-8x-more-solar-energy',
    title: 'Does Orbit Really Give You 8x More Solar Energy Than the Ground?',
    date: '2026-11-08',
    pillar: 'library',
    type: 'STD',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'solar', 'power-budget'],
    links: ['SBX-MOD-002'],
    status: 'published',
    summary:
      "Testing the solar energy multiplier and satellite power budget in Google's Project Suncatcher paper.",
    externalUrl:
      'https://scimperative.substack.com/p/does-orbit-really-give-you-8x-more',
  },
  {
    id: 'LIB-NTE-003',
    slug: 'what-an-eclipse-costs-a-solar-array',
    title: 'What An Eclipse Costs a Solar Array',
    date: '2026-10-28',
    pillar: 'library',
    type: 'NTE',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'solar', 'eclipse'],
    links: ['SBX-MOD-002'],
    status: 'published',
    summary:
      'Quantifying the duty-cycle and battery-mass penalty imposed by orbital eclipse periods on continuous compute payloads.',
    externalUrl:
      'https://scimperative.substack.com/p/what-an-eclipse-costs-a-solar-array',
  },
  {
    id: 'LIB-NTE-004',
    slug: 'what-happened-to-elons-brain-bandwidth-hypothesis',
    title: 'What Happened to Elon’s Brain Bandwidth Bottleneck Hypothesis?',
    date: '2026-10-25',
    pillar: 'library',
    type: 'NTE',
    thread_id: 'THD-INTELLIGENCE-PHYSICAL',
    tags: ['bandwidth', 'bci', 'intelligence'],
    links: [],
    status: 'published',
    summary:
      'Ten years ago, Sam Altman and Elon Musk discussed the future of intelligence. Musk’s answer to the AI bandwidth and control problem was a neural link. What’s happened since?',
    externalUrl:
      'https://scimperative.substack.com/p/what-happened-to-elons-brain-bandwidth',
  },
  {
    id: 'LIB-STD-001',
    slug: 'keystone-parameter-of-deployed-orbital-ai-compute',
    title: 'The Keystone Parameter of Deployed Orbital AI Compute',
    date: '2026-10-23',
    pillar: 'library',
    type: 'STD',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'thermal', 'radiators'],
    links: ['SBX-MOD-001'],
    status: 'published',
    summary:
      'Identifying the specific radiator-area-to-power ratio that governs whether orbital AI compute can close its thermal budget.',
    externalUrl:
      'https://scimperative.substack.com/p/the-keystone-parameter-of-deployed',
  },
  {
    id: 'LIB-NTE-002',
    slug: 'physics-based-sandbox-architecture',
    title: 'Physics-Based Sandbox Architecture and Orbital Compute Thermal Rejection Limits',
    date: '2026-10-23',
    pillar: 'library',
    type: 'NTE',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'thermal', 'sandbox'],
    links: ['SBX-MOD-001'],
    status: 'published',
    summary:
      'How first-principles physics models are structured in the Silicon Carbide Imperative Sandbox, using orbital thermal rejection as the reference case.',
    externalUrl:
      'https://scimperative.substack.com/p/physics-based-sandbox-architecture',
  },
  {
    id: 'LIB-NTE-001',
    slug: 'one-reason-cooling-ai-in-orbit-is-harder',
    title: 'One Reason Cooling AI in Orbit is Harder Than You Thought',
    date: '2026-10-23',
    pillar: 'library',
    type: 'NTE',
    thread_id: 'THD-ORBITAL-COMPUTE',
    tags: ['orbital', 'thermal', 'radiators'],
    links: ['SBX-MOD-001'],
    status: 'published',
    summary:
      'Why radiative heat rejection in vacuum scales with the fourth power of temperature and creates an unforgiving area bottleneck.',
    externalUrl:
      'https://scimperative.substack.com/p/one-reason-cooling-ai-in-orbit-is',
  },
  {
    id: 'LIB-NTE-005',
    slug: 'sandbox-manifesto',
    title: 'Sandbox',
    date: '2026-10-20',
    pillar: 'library',
    type: 'NTE',
    thread_id: 'THD-INTELLIGENCE-PHYSICAL',
    tags: ['sandbox', 'simulation', 'intelligence'],
    links: ['SBX-MOD-003'],
    status: 'published',
    summary:
      'An attempt at developing Universe Sandbox for the artificial intelligence industry.',
    externalUrl: 'https://scimperative.substack.com/p/sandbox',
  },
];

export function getPublishedEntities(): Entity[] {
  return ENTITIES.filter((e) => e.status === 'published');
}

export function getThreadById(id: string): Thread | undefined {
  return THREADS.find((t) => t.id === id);
}

export function getThreadBySlug(slug: string): Thread | undefined {
  return THREADS.find((t) => t.slug === slug);
}

export function getEntityById(id: string): Entity | undefined {
  return ENTITIES.find((e) => e.id === id);
}

export function getEntityBySlug(pillar: Pillar, slug: string): Entity | undefined {
  return ENTITIES.find((e) => e.pillar === pillar && e.slug === slug);
}

export function getEntityUrl(entity: Entity): string {
  if (entity.pillar === 'sandbox' && entity.sandboxModuleId) {
    return `/sandbox/${entity.sandboxModuleId}/`;
  }
  return `/${entity.pillar}/${entity.slug}/`;
}

export function getEntitiesByThread(threadId: string): Entity[] {
  return getPublishedEntities().filter((e) => e.thread_id === threadId);
}

export function getEntitiesByPillar(pillar: Pillar): Entity[] {
  return getPublishedEntities().filter((e) => e.pillar === pillar);
}

export function buildSearchIndex(): SearchIndexItem[] {
  return getPublishedEntities().map((e) => {
    const thread = getThreadById(e.thread_id);
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      thread: thread?.title ?? e.thread_id,
      thread_slug: thread?.slug ?? '',
      tags: e.tags,
      links: e.links,
      url: getEntityUrl(e),
      pillar: e.pillar,
    };
  });
}

export function validateKnowledgeGraph(): string[] {
  const errors: string[] = [];
  const entityMap = new Map(ENTITIES.map((e) => [e.id, e]));
  const threadIds = new Set(THREADS.map((t) => t.id));

  for (const entity of ENTITIES) {
    if (entity.status === 'published' && !threadIds.has(entity.thread_id)) {
      errors.push(`Entity ${entity.id} references unknown thread_id "${entity.thread_id}"`);
    }
    if (entity.tags.length < 2) {
      errors.push(`Entity ${entity.id} has fewer than 2 tags`);
    }
    for (const targetId of entity.links) {
      const target = entityMap.get(targetId);
      if (!target) {
        errors.push(`Entity ${entity.id} links to unknown ID "${targetId}"`);
      } else if (!target.links.includes(entity.id)) {
        errors.push(`Link ${entity.id} -> ${targetId} is not bidirectional`);
      }
    }
  }

  return errors;
}

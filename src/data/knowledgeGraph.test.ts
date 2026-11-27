import assert from 'node:assert/strict';
import {
  THREADS,
  ENTITIES,
  buildSearchIndex,
  validateKnowledgeGraph,
} from './knowledgeGraph';

const errors = validateKnowledgeGraph();
assert.deepEqual(errors, [], `Knowledge graph validation failed:\n${errors.join('\n')}`);
assert.ok(THREADS.length >= 3, 'Expected at least 3 threads');
assert.ok(ENTITIES.length >= 10, 'Expected at least 10 entities');

const index = buildSearchIndex();
assert.equal(index.length, ENTITIES.filter((e) => e.status === 'published').length);
for (const item of index) {
  assert.ok(item.id && item.title && item.url && item.thread_slug, `Invalid search item: ${item.id}`);
}

console.log(`Knowledge graph verified: ${THREADS.length} threads, ${ENTITIES.length} entities, 0 link errors.`);

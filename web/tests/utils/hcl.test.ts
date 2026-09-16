import { describe, expect, it } from 'vitest';
import { toHcl } from '../../src/utils/hcl';

// Alias for the indentation unit used by toHcl (2 spaces)
const I = '  ';
const I2 = I + I;

describe('toHcl', () => {
	describe('primitives', () => {
		it('formats string values with double quotes', () => {
			expect(toHcl({ name: 'hello' })).toBe('name = "hello"');
		});

		it('formats number values', () => {
			expect(toHcl({ count: 42 })).toBe('count = 42');
		});

		it('formats boolean values', () => {
			expect(toHcl({ enabled: true })).toBe('enabled = true');
			expect(toHcl({ enabled: false })).toBe('enabled = false');
		});

		it('formats null values', () => {
			expect(toHcl({ value: null })).toBe('value = null');
		});
	});

	describe('arrays', () => {
		it('formats empty arrays', () => {
			expect(toHcl({ items: [] })).toBe('items = []');
		});

		it('formats arrays of strings inline', () => {
			expect(toHcl({ tags: ['a', 'b', 'c'] })).toBe('tags = ["a", "b", "c"]');
		});

		it('formats arrays of numbers inline', () => {
			expect(toHcl({ ports: [80, 443] })).toBe('ports = [80, 443]');
		});

		it('formats arrays of booleans inline', () => {
			expect(toHcl({ flags: [true, false] })).toBe('flags = [true, false]');
		});

		it('formats mixed primitive arrays inline', () => {
			expect(toHcl({ mixed: ['a', 1, true, null] })).toBe(
				'mixed = ["a", 1, true, null]',
			);
		});

		it('formats arrays of objects on separate lines', () => {
			const result = toHcl({
				items: [
					{ name: 'foo', version: 1 },
					{ name: 'bar', version: 2 },
				],
			});

			expect(result).toBe(
				[
					'items = [',
					`${I}{`,
					`${I2}name = "foo"`,
					`${I2}version = 1`,
					`${I}},`,
					`${I}{`,
					`${I2}name = "bar"`,
					`${I2}version = 2`,
					`${I}},`,
					']',
				].join('\n'),
			);
		});
	});

	describe('objects', () => {
		it('formats empty objects as blocks', () => {
			expect(toHcl({ block: {} })).toBe('block {}');
		});

		it('formats nested objects as blocks without =', () => {
			const result = toHcl({
				server: {
					host: 'localhost',
					port: 8080,
				},
			});

			expect(result).toBe(
				['server {', `${I}host = "localhost"`, `${I}port = 8080`, '}'].join(
					'\n',
				),
			);
		});

		it('formats deeply nested objects', () => {
			const result = toHcl({
				a: {
					b: {
						c: 'deep',
					},
				},
			});

			expect(result).toBe(
				['a {', `${I}b {`, `${I2}c = "deep"`, `${I}}`, '}'].join('\n'),
			);
		});
	});

	describe('keys', () => {
		it('leaves valid identifiers bare', () => {
			expect(toHcl({ valid_key: 1 })).toBe('valid_key = 1');
			expect(toHcl({ key123: 1 })).toBe('key123 = 1');
			expect(toHcl({ _private: 1 })).toBe('_private = 1');
			expect(toHcl({ 'with-dash': 1 })).toBe('with-dash = 1');
		});

		it('quotes keys with special characters', () => {
			expect(toHcl({ 'my.key': 'value' })).toBe('"my.key" = "value"');
			expect(toHcl({ 'with spaces': true })).toBe('"with spaces" = true');
			expect(toHcl({ '123start': 1 })).toBe('"123start" = 1');
		});
	});

	describe('top-level formatting', () => {
		it('returns empty string for empty object', () => {
			expect(toHcl({})).toBe('');
		});

		it('separates top-level entries with blank lines', () => {
			const result = toHcl({
				a: 1,
				b: 2,
				c: 3,
			});

			expect(result).toBe('a = 1\n\nb = 2\n\nc = 3');
		});
	});

	describe('labeled blocks', () => {
		it('expands a top-level labeled block', () => {
			const result = toHcl(
				{
					tasks: {
						build: {
							command: 'build-project',
						},
						test: {
							command: 'run-tests',
						},
					},
				},
				{ labeledBlocks: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks "build" {',
					`${I}command = "build-project"`,
					'}',
					'',
					'tasks "test" {',
					`${I}command = "run-tests"`,
					'}',
				].join('\n'),
			);
		});

		it('expands a nested labeled block via dot path', () => {
			const result = toHcl(
				{
					workspace: {
						tasks: {
							build: {
								command: 'build-project',
								inputs: ['src/**'],
							},
						},
					},
				},
				{ labeledBlocks: ['workspace.tasks'] },
			);

			expect(result).toBe(
				[
					'workspace {',
					`${I}tasks "build" {`,
					`${I2}command = "build-project"`,
					`${I2}inputs = ["src/**"]`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('handles multiple entries in a labeled block', () => {
			const result = toHcl(
				{
					tasks: {
						build: { command: 'build' },
						test: { command: 'test' },
						lint: { command: 'lint' },
					},
				},
				{ labeledBlocks: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks "build" {',
					`${I}command = "build"`,
					'}',
					'',
					'tasks "test" {',
					`${I}command = "test"`,
					'}',
					'',
					'tasks "lint" {',
					`${I}command = "lint"`,
					'}',
				].join('\n'),
			);
		});

		it('handles labeled blocks with deeply nested content', () => {
			const result = toHcl(
				{
					tasks: {
						build: {
							options: {
								retries: 3,
							},
						},
					},
				},
				{ labeledBlocks: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks "build" {',
					`${I}options {`,
					`${I2}retries = 3`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('does not expand keys not in labeledBlocks', () => {
			const result = toHcl(
				{
					tasks: {
						build: { command: 'build' },
					},
					runner: {
						logStyle: 'stream',
					},
				},
				{ labeledBlocks: ['tasks'] },
			);

			expect(result).toBe(
				[
					'tasks "build" {',
					`${I}command = "build"`,
					'}',
					'',
					'runner {',
					`${I}logStyle = "stream"`,
					'}',
				].join('\n'),
			);
		});

		it('produces no output for an empty labeled block', () => {
			expect(toHcl({ tasks: {} }, { labeledBlocks: ['tasks'] })).toBe('');
		});

		it('ignores labeledBlocks option for non-object values', () => {
			expect(
				toHcl({ tasks: ['build', 'test'] }, { labeledBlocks: ['tasks'] }),
			).toBe('tasks = ["build", "test"]');
		});

		it('supports multiple labeledBlocks paths', () => {
			const result = toHcl(
				{
					tasks: {
						build: { command: 'build' },
					},
					targets: {
						web: { platform: 'browser' },
					},
				},
				{ labeledBlocks: ['tasks', 'targets'] },
			);

			expect(result).toBe(
				[
					'tasks "build" {',
					`${I}command = "build"`,
					'}',
					'',
					'targets "web" {',
					`${I}platform = "browser"`,
					'}',
				].join('\n'),
			);
		});

		it('handles labeled block entries with primitive values', () => {
			const result = toHcl(
				{
					env: {
						NODE_ENV: 'production',
						DEBUG: true,
					},
				},
				{ labeledBlocks: ['env'] },
			);

			expect(result).toBe(
				['env "NODE_ENV" = "production"', '', 'env "DEBUG" = true'].join('\n'),
			);
		});
	});

	describe('realistic configs', () => {
		it('formats a moon workspace config', () => {
			const result = toHcl({
				workspace: {
					projects: {
						globs: ['apps/*', 'packages/*'],
					},
					vcs: {
						manager: 'git',
						defaultBranch: 'main',
					},
				},
			});

			expect(result).toBe(
				[
					'workspace {',
					`${I}projects {`,
					`${I2}globs = ["apps/*", "packages/*"]`,
					`${I}}`,
					`${I}vcs {`,
					`${I2}manager = "git"`,
					`${I2}defaultBranch = "main"`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});

		it('formats mixed top-level entries', () => {
			const result = toHcl({
				runner: {
					cacheLifetime: '24 hours',
					autoInstall: true,
				},
				tasks: ['build', 'test'],
				retries: 3,
			});

			expect(result).toBe(
				[
					'runner {',
					`${I}cacheLifetime = "24 hours"`,
					`${I}autoInstall = true`,
					'}',
					'',
					'tasks = ["build", "test"]',
					'',
					'retries = 3',
				].join('\n'),
			);
		});

		it('formats a config with labeled task blocks', () => {
			const result = toHcl(
				{
					workspace: {
						projects: {
							globs: ['apps/*'],
						},
					},
					tasks: {
						build: {
							command: 'build-project',
							inputs: ['src/**'],
						},
						test: {
							command: 'run-tests',
							options: {
								retries: 2,
							},
						},
					},
				},
				{ labeledBlocks: ['tasks'] },
			);

			expect(result).toBe(
				[
					'workspace {',
					`${I}projects {`,
					`${I2}globs = ["apps/*"]`,
					`${I}}`,
					'}',
					'',
					'tasks "build" {',
					`${I}command = "build-project"`,
					`${I}inputs = ["src/**"]`,
					'}',
					'',
					'tasks "test" {',
					`${I}command = "run-tests"`,
					`${I}options {`,
					`${I2}retries = 2`,
					`${I}}`,
					'}',
				].join('\n'),
			);
		});
	});
});

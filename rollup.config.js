import * as path from 'path'
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import sass from 'node-sass';


const production = !process.env.ROLLUP_WATCH;
const isProduction = process.env.BUILD === 'production';

let apiUrl = isProduction ? 'https://auth.knight.works' : 'http://localhost:3001'

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
        replace({ 
            //__AUTH_URL__: 'https://auth.knight.works/api/v1/login', 
            // TODO: Clean this up
            __AUTH_URL__: 'http://localhost:3001/api/v1/login', 
            __API_URL__:  apiUrl + '/api/v1', 
        }),
        alias({
            entries: [
                { find: '$p', replacement: 'src/pages' },
                { find: '$c', replacement: 'src/components' },
                { find: '$frontier', replacement: '@frontierjs/frontend' },
                { find: '$frontier-c', replacement: '@frontierjs/frontend/components' },
                { find: '$router', replacement: '@sveltech/routify' }
            ]
        }),
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file — better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			preprocess: {
				style: ({ content, attributes }) => {
					if (attributes.type !== 'text/scss') return;

					return new Promise((fulfil, reject) => {
						sass.render({
							data: content,
							includePaths: ['src'],
							sourceMap: true,
							outFile: 'x' // this is necessary, but is ignored
						}, (err, result) => {
							if (err) return reject(err);

							fulfil({
								code: result.css.toString(),
								map: result.map.toString()
							});
						});
					});
				}
			}

		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true
				});
			}
		}
	};
}

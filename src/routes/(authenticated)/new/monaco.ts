import * as monaco from 'monaco-editor';

// Import the workers in a production-safe way.
// This is different than in Monaco's documentation for Vite,
// but avoids a weird error ("Unexpected usage") at runtime
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

self.MonacoEnvironment = {
	getWorker: function (_: string, label: string) {
		switch (label) {
			// in the future, we might want to add more workers here, like markdown
			default:
				return new editorWorker();
		}
	}
};

export default monaco;

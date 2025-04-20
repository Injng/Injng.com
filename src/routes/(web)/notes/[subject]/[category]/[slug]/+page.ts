import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		// load notes
		const post = await import(
			`../../../../../../notes/${params.subject}/${params.category}/${params.slug}.svx`
			);
		const allNotes = [];
		const allPaths = import.meta.glob('../../../../../../notes/**/**/*.svx', { eager: true });

		const categoryPath = `/notes/${params.subject}/${params.category}/`;
		const paths = Object.entries(allPaths).filter(([path]) =>
			path.includes(categoryPath));

		for (const [file, module] of paths) {
			const title = module.metadata.title;
			const slug = file.split('/').at(-1)?.replace('.svx', '');

			if (slug) {
				allNotes.push({ title, slug });
			}
		}

		allNotes.sort((a, b) => a.title.localeCompare(b.title));
		const currentIndex = allNotes.findIndex(note => note.slug === params.slug);
		const prevNote = currentIndex > 0 ? allNotes[currentIndex - 1] : null;
		const nextNote = currentIndex < allNotes.length - 1 ? allNotes[currentIndex + 1] : null;

		return {
			content: post.default,
			meta: post.metadata,
			subject: params.subject,
			category: params.category,
			slug: params.slug,
			prevNote,
			nextNote
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
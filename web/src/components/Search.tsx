import { liteClient } from 'algoliasearch/lite';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogFooter,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	type SharedProps,
} from 'fumadocs-ui/components/dialog/search';

const appId = '400S075OEM';
const apiKey = 'dfe3e44100d7dfc6d7d3b644e8b09581';
const client = liteClient(appId, apiKey);

export default function CustomSearchDialog(props: SharedProps) {
	const { search, setSearch, query } = useDocsSearch({
		type: 'algolia',
		client,
		indexName: 'moonrepo',
		locale: 'en',
	});

	return (
		<SearchDialog
			isLoading={query.isLoading}
			onSearchChange={setSearch}
			search={search}
			{...props}
		>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList items={query.data !== 'empty' ? query.data : null} />
				<SearchDialogFooter>
					<a
						className="ms-auto text-xs text-fd-muted-foreground"
						href="https://algolia.com"
						rel="noreferrer noopener"
					>
						Search powered by Algolia
					</a>
				</SearchDialogFooter>
			</SearchDialogContent>
		</SearchDialog>
	);
}

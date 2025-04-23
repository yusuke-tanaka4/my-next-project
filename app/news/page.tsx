import {getNewsList} from "../_libs/microcms";
import NewsList from "../_components/NewsList";
import Pagenation from "../_components/Pagenation";
import SearchField from "../_components/SearchField";
import {NEWS_LIST_LIMIT} from "../_constants";

export const revalidate = 0;

export default async function Page() {
  const {contents: news, totalCount} = await getNewsList({
    limit: NEWS_LIST_LIMIT,
  });

  return (
    <>
      <SearchField />
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} />
    </>
  )
}
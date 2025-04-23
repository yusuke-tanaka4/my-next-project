import {getCategoryDetail, getNewsList} from "../../../_libs/microcms";
import {notFound} from "next/navigation";
import NewsList from "../../../_components/NewsList";
import Pagenation from "../../../_components/Pagenation";
import Category from "../../../_components/Category"
import {NEWS_LIST_LIMIT} from "../../../_constants";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({params}: Props) {
  const category = await getCategoryDetail(params.id).catch(notFound);

  const { contents: news, totalCount } = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    filters: `category[equals]${category.id}`,
  });

  return (
    <>
      <p>
        <Category category={category} /> の一覧
      </p>
      <NewsList news={news} />
      <Pagenation
        totalCount={totalCount}
        basePath={`/news/category/${category.id}`}
      />
    </>
  );
}
import{notFound} from "next/navigation";
import{getNewsList} from "../../../_libs/microcms";
import NewsList from "../../../_components/NewsList";
import Pagenation from "../../../_components/Pagenation"
import {NEWS_LIST_LIMIT} from "../../../_constants";

type Props = {
  params: {
    current: string;
  };
};

export default async function Page({params}: Props) {
  const current = parseInt(params.current, 10);

  if(Number.isNaN(current) || current < 1) {
    notFound();
  }

  const {contents: news, totalCount} = await getNewsList({
    limit: NEWS_LIST_LIMIT,
    offset: NEWS_LIST_LIMIT * (current - 1),
  });
  
  if(news.length === 0) {
    notFound();
  }

  return (
    <>
      <NewsList news={news} />
      <Pagenation totalCount={totalCount} current={current} />
    </>
  );
}
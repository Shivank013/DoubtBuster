import dynamic from 'next/dynamic';

const Page = dynamic(() => import('./PageComp'), { ssr: false });

function page() {
  return <Page />;
}

export default page;
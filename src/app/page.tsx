import Homepage from '@/components/pages/homepage';
import base from '@/utils/airtable';

export default async function Home() {
  const products = await base('products')
    .select({
      filterByFormula: '{featured} = 1',
      maxRecords: 8,
      view: 'Grid view',
    })
    .all();

  const dataForHomepage = {
    products: products,
    shopTitle: 'ThapCamStore',
    shopSubtitle: 'Chất lượng - Giá tốt - Giao hàng nhanh',
  };

  return <Homepage data={JSON.stringify(dataForHomepage)} />;
}

'use client';
export default function ProductsList(props: { data: any }) {
  console.log(JSON.parse(props.data));
  return <>Products List</>;
}

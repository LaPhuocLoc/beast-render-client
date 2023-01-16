import React from "react";
import "./list.scss";
import Card from "../Card/Card";
import { motion } from 'framer-motion'
import { Skeleton } from 'antd';

const List = ({ loading, selectedBrands, selectedCates, sort, items }) => {
  // const { data, loading, error } = useFetch(
  //   cateType === 'categories'
  //     ? `/products?populate=*&[filters][categories][title]=${cateName}${subCats.map(
  //       (item) => `&[filters][sub_categories][id][$eq]=${item}`
  //     )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  //     : cateType === 'sub-categories'
  //       ? `/products?populate=*&[filters][sub_categories][title]=${cateName}${subCats.map(
  //         (item) => `&[filters][categories][id][$eq]=${item}`
  //       )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  //       : `/products?populate=*${subCats.map(
  //         (item) => `&[filters][categories][id][$eq]=${item}`
  //       )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  // );
  // const data = items.filter(item => selectedCates.includes(item.attributes.categories.data[0].attributes.title) || selectedBrands.includes(item.attributes.sub_categories.data[0].attributes.title))
  const data = items.filter(
    item => (selectedCates.length === 0 && selectedBrands.length === 0) ||
      selectedCates.includes(item.attributes.categories.data[0].attributes.title) || selectedBrands.includes(item.attributes.sub_categories.data[0].attributes.title))
  const sortedData = sort === 'asc'
    ? data.sort((a, b) => a.attributes.price - b.attributes.price)
    : sort === 'name'
      ? data.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title))
      : data.sort((a, b) => b.attributes.price - a.attributes.price)
  if (loading) {
    return (
      <div className="list">
        <Skeleton active avatar />
        <Skeleton active avatar />
        <Skeleton active avatar />
        <Skeleton active avatar />
        <Skeleton active avatar />
        <Skeleton active avatar />
      </div>
    )
  }
  return (
    <motion.div
      layout
      className="list"
    >
      {
        sortedData?.map((item) => <Card item={item} key={item.id} />)
      }
    </motion.div>
  );
};

export default List;
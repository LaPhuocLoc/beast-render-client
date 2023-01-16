import React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Checkbox, Radio } from 'antd'
import useFetch from "../../hooks/useFetch";
import "./categories.scss";
import List from '../../components/List/List';
import thumbnails from '../../assets/categories/categories.png'
import { Skeleton } from 'antd';

const Categories = () => {
  const cateType = useLocation().pathname.split('/')[1];
  const cateName = useParams().name;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filterCateItems, setFilterCateItems] = useState([]);
  const [filterBrandItems, setFilterBrandItems] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCates, setSelectedCates] = useState([]);
  const [sort, setSort] = useState('asc');
  const { data, loading } = useFetch('/products?populate=*&pagination[page]=1&pagination[pageSize]=50');
  const { data: filterCate, loading: filterCateLoading } = useFetch(`/categories${cateType === 'sub-categories' ? `?[filters][sub_categories][title][$eq]=${cateName}` : '?'}`)
  const { data: filterBrand, loading: filterBrandLoading } = useFetch(`/sub-categories${cateType === 'categories' ? `?[filters][categories][title][$eq]=${cateName}` : '?'}`)
  // cateType === 'categories'
  //   ? `/sub-categories?[filters][categories][title][$eq]=${cateName}`
  //   : cateType === 'sub-categories'
  //     ? `/categories?[filters][sub_categories][title][$eq]=${cateName}`
  //     : `/categories`
  useEffect(() => {

    setCategories(data.filter(item => item.attributes.categories.data[0].attributes.title === cateName))
    setBrands(data.filter(item => item.attributes.sub_categories.data[0].attributes.title === cateName))
    setFilterCateItems(filterCate.map(item => item.attributes.title))
    setFilterBrandItems(filterBrand.map(item => item.attributes.title))
    setSelectedBrands([])
    setSelectedCates([])
  }, [data, cateName, filterCate, filterBrand]);
  const handleBrandChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedBrands(
      isChecked
        ? [...selectedBrands, value]
        : selectedBrands.filter((item) => item !== value)
    );
    // console.log(selectedBrands);
  };
  const handleCateChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCates(
      isChecked
        ? [...selectedCates, value]
        : selectedCates.filter((item) => item !== value)
    );
    // console.log(selectedCates);
  };
  return (
    <>
      {/* <div className="slide"></div> */}
      <div className="categories">
        <div className="categories__header">
          <div className="catImg">
            <div className="overlay"></div>
            <img
              src={thumbnails}
              alt=""
            />
          </div>
          <h3 className="title">{cateName} Products</h3>
        </div>
        <div className="categories__body">
          <div className="container">
            <Row>
              <Col xs={24} md={6}>
                <div className="left">
                  {(cateType === 'categories' || cateType === 'products') &&
                    (<div className="filterItem">
                      <h2>Product Brands</h2>
                      {filterBrandLoading ? <Skeleton active /> : (
                        <Checkbox.Group>
                          {filterBrandItems?.map((item, i) => (
                            <div className="inputItem" key={i}>
                              <Checkbox
                                id={item}
                                value={item}
                                onChange={handleBrandChange}
                              >
                                {item}
                              </Checkbox>
                            </div>
                          ))}
                        </Checkbox.Group>
                      )}
                    </div>)
                  }
                  {(cateType === 'sub-categories' || cateType === 'products') &&
                    (
                      <div className="filterItem">
                        <h2>Product Categories</h2>
                        {filterCateLoading ? <Skeleton active paragraph={{ width: 100 }} /> : (
                          <Checkbox.Group>
                            {filterCateItems?.map((item, i) => (
                              <div className="inputItem" key={i}>
                                <Checkbox
                                  id={item}
                                  value={item}
                                  onChange={handleCateChange}
                                >{item}</Checkbox>
                              </div>
                            ))}
                          </Checkbox.Group>
                        )}
                      </div>
                    )}
                  <div className="filterItem">
                    <h2>Sort by</h2>
                    <Radio.Group>
                      <div className="inputItem">
                        <Radio
                          id="asc"
                          value="asc"
                          name="price"
                          onChange={(e) => setSort("asc")}
                        >
                          Price - Low to High
                        </Radio>
                      </div>
                      <div className="inputItem">
                        <Radio
                          id="desc"
                          value="desc"
                          name="price"
                          onChange={(e) => setSort("desc")}
                        >
                          Price - High to Low
                        </Radio>
                      </div>
                    </Radio.Group>
                    {/* <div className="inputItem">
                      <input
                        type="radio"
                        id="asc"
                        value="asc"
                        name="price"
                        onChange={(e) => setSort("asc")}
                      />
                      <label htmlFor="asc">Price - Low to High</label>
                    </div>
                    <div className="inputItem">
                      <input
                        type="radio"
                        id="desc"
                        value="desc"
                        name="price"
                        onChange={(e) => setSort("desc")}
                      />
                      <label htmlFor="desc">Price - High to Low</label>
                    </div> */}
                  </div>
                </div>
              </Col>
              <Col xs={24} md={18}>
                <div className="right">
                  <List
                    loading={loading}
                    sort={sort}
                    selectedBrands={selectedBrands}
                    selectedCates={selectedCates}
                    items={cateType === 'categories' ? categories : cateType === 'sub-categories' ? brands : data}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>

      </div>
    </>
  );
};

export default Categories;
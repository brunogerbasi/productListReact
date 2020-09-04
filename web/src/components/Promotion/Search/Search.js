import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PromotionList from '../List/List';
import './Search.css';

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [searchCategories, setSearchCategories] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState([]);
  const [postPage, setPostsPage] = useState(3);

  //Init
  useEffect(() => {
    getCategories()
    getTotalPages()
  });

  useEffect(() => {

    const params = {
      _page: page,
      _limit: postPage
    };

    if (search) {
      params.name_like = search;
    }

    if (searchCategories) {
      params.categories_like = searchCategories
    }

    axios.get('http://localhost:5000/promotions', { params })
      .then((response) => {
    
        setPromotions(response.data);
      });
  }, [search, page, searchCategories]);

  //Calls

  //Get all Apps from API
  function getPromotions() {

    const params = {
      _page: page,
      _limit: postPage
    };

    if (search) {
      params.name_like = search;
    }

    if (searchCategories) {
      params.categories_like = searchCategories
    }

    axios.get('http://localhost:5000/promotions', { params })
      .then((response) => {
        console.log(response)
        setPromotions(response.data);
      });
  }

  //Get total number of all Apps
  function getTotalPages() {
    axios.get('http://localhost:5000/total')
      .then((response) => {
        const numPages = Math.ceil(response.data.number / postPage)
        const arrayPages = [];
        for (let i = 1; i < numPages + 1; i++) {
          arrayPages.push(i)
        }
        setTotalPage(arrayPages);
      });
  }

  //Get all Categories from Apps
  function getCategories() {
    axios.get('http://localhost:5000/promotions')
      .then((response) => {
        let categories = []
        response.data.map((el) => {
          el.categories.map((cat) => {
            let has = categories.includes(cat)
            if (!has) {
              categories.push(cat)
            }
          })
        })
        categories.sort()
        setCategories(categories);
      });
  }

  return (
    <div className="flex-container">

      <nav className="nav-categories">
        <h2>Categories</h2>
        <ul className="nav-menu">
          <li className={searchCategories === "" ? "active" : ""} onClick={() => setSearchCategories('')}><a href="#">All</a></li>
          {categories.map((cat, index) => (
            <li className={searchCategories === cat ? "active" : ""} onClick={() => setSearchCategories(cat)} key={index}><a href="#">{cat}</a></li>
          ))}
        </ul>
      </nav>

      <section className="apps-list">
        <header>
          <input type="search" placeholder="Search by App" value={search} onChange={(ev) => setSearch(ev.target.value)} />
        </header>
        <ul>
          <PromotionList promotions={promotions} loading={!promotions.length} />
        </ul>
        {
          searchCategories.length <= 0
            ? <ul className="pagination">
              <li className={page > 1 ? "" : "blocked"} onClick={() => setPage(page - 1)}><a href="#">&lt;</a></li>
              {totalPage.map((p, index) => (
                <li className={page === p ? "active" : ""} onClick={() => setPage(p)} key={index}><a href="#">{p}</a></li>
              ))}
              <li className={page === totalPage.length ? "blocked" : ""} onClick={() => setPage(page + 1)}><a href="#">&gt;</a></li>
            </ul>
            : ""
        }

      </section>
    </div>
  );
};

export default PromotionSearch;

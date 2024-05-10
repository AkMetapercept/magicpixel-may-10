import React, { useRef, useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const SearchModal = ({ showModal, setShowModal }) => {
  // const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const modalRef = useRef();

  const data = useStaticQuery(
    graphql`
      query {
        allMdx {
          nodes {
            id
            frontmatter {
              title
            }
            headings {
              value
            }
            fields {
              slug
            }
          }
        }
      }
    `
  );

  const allLinksData = [];
  data.allMdx.nodes.forEach((node) => {
    // allLinksData.push({ title: node?.frontmatter?.title, url: node?.fields?.slug });
    if (node?.headings.length > 0) {
      node.headings.forEach((heading) => {
        const idPath = heading?.value.replace(/\s+/g, '').toLowerCase();
        allLinksData.push({ title: heading?.value, url: node?.fields?.slug + '/#' + idPath });
      });
    }
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      const searchResults = allLinksData?.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(() => searchResults);
    } else {
      setResults([]);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const clearSearchText = () => {
    setQuery(''); // Clear the search input value
    setResults([]); // Clear the search results
  };

  const handleModalClick = (e) => {
    if (modalRef.current === e.target) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      style={{ display: showModal ? 'block' : 'none' }}
      ref={modalRef}
      onClick={handleModalClick}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-describedby="basic-addon1"
                value={query}
                onChange={handleInputChange}
              />
              <button className="closeicon" onClick={clearSearchText}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <ul className="list-unstyled result-ul">
              {results.map((result, i) => (
                <li key={i} className="border p-2 my-1" onClick={handleClose}>
                  <Link to={result.url}>
                    <h6 className="mb-0 search-result">{result.title}</h6>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

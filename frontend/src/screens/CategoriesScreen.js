import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from './../store/actions/categoryActions';
import Layout from './../layout/layout';
import styled from 'styled-components';
import { Card, Text } from 'rebass/styled-components';
import { Img, Row } from '../theme/globalElements';

const CategoriesScreen = ({ history }) => {
    const dispatch = useDispatch();
    const categoriesFromState = useSelector((state) => state.categoryList);
    const { loading, error, categories, page, pages } = categoriesFromState;

    useEffect(() => {
        dispatch(listCategories('', 1));
    }, []);

    const klikkHandler = (name, desc, slug, _id) => {
        history.push({
            pathname: `/${slug}`,
            state: {
                categoryName: name,
                categoryDesc: desc,
                categorySlug: slug,
                categoryId: _id
            }
        })
    };

console.log('boss');
    return (
        <Layout >
            <Row first>
                <h1>
                    Kategóriák
                </h1>
            </Row>
            <Row>
                {loading ? (
                    <p>loading</p>
                ) : error ? (
                    <p>error</p>
                ) : (<Cont >
                    {categories.map((cat, index) => (
                        <Card key={cat._id}
                            bg="lightgray"
                            p={2}
                            m=".2rem"
                            minWidth={280}
                            maxWidth={570}
                            onClick={klikkHandler.bind(
                                null,
                                cat.name,
                                cat.description,
                                cat.slug,
                                cat._id)}
                        >
                            <h3>{cat.name}</h3>
                            <Img
                                src={`${process.env.REACT_APP_PIC}${cat.image}`}
                                width={1}
                            //height={1}
                            ></Img>
                            <Text>{cat.description}</Text>
                        </Card>
                    ))}
                </Cont>)
                }
            </Row>
        </Layout>
    )
};

export default CategoriesScreen;

const Cont = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 1rem;
& div {
    cursor: pointer;
}
`;

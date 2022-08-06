import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const Title = styled(Link)`
  font-size: 38px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const Preview = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px; */
`;
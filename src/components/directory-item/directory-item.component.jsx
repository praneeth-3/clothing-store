import {BackgroundImg, Body, DirectoryItemContainer} from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {
    const {title, imageUrl, route} = category;
    const naigate = useNavigate();
    const onNavigateHandler = ()=> naigate(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImg imageUrl={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
};

export default DirectoryItem;
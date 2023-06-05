import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CardList() {
    const navigate = useNavigate();

    const handleCardClick = (searchQuery, websiteUrl) => {
        if (websiteUrl) {
        window.open(websiteUrl, '_blank');
        } else if (searchQuery) {
        const encodedQuery = encodeURIComponent(searchQuery);
        const naverSearchUrl = `https://search.naver.com/search.naver?query=${encodedQuery}`;
        window.open(naverSearchUrl, '_blank');
        }
    }

    const cards = [
        {
        imageSrc: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200311_199%2F1583890188350cH60n_JPEG%2FewuwSU5L8pdZXSVJSEnc4oG6.JPG.jpg',
        title: '전주 한옥마을',
        websiteUrl: 'http://hanok.jeonju.go.kr/'
        },
        {
        imageSrc: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzA0MTZfOTMg%2FMDAxNjgxNjAzODc3NzAz.7RLK_D5DFxJmc-yghipy0uV0TwVQx22uvIcf1SZZtLog.Fm5wbEuRBZfY9mITbqO_Avb6nXCRwMflxeHwEfGtaVMg.JPEG%2F72690F1B-1076-409A-AA46-141832E07C50.jpeg',
        title: '담양 죽녹원',
        websiteUrl: 'https://www.juknokwon.go.kr/index.juknok?menuCd=DOM_000000101001000000'
        },
        {
        imageSrc: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MTdfMTE3%2FMDAxNjYwNzIwMzc3MTI4.7nwMKoQt0f7vvSeuDp90Z9CSBfp2gwwUJHTewA6MClgg.ILD1u8Y6pBTO2-2WZHv_W0hEMcy9hO_ENKVGaJRW5Rog.JPEG.586hot%2F20220815_105756.jpg',
        title: '제주도 태웃개',
        websiteUrl: ''
        }
    ];

    const renderCards = () => {
        return cards.map((card, index) => (
        <div className="col-md-3 col-sm-12" key={index}>
            <div className="Mcard" onClick={() => handleCardClick(card.title, card.websiteUrl)}>
            <img src={card.imageSrc} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-text text-center Mcard-text">{card.title}</h5>
            </div>
            </div>
        </div>
        ));
    }

    return (
        <div className="container-list">
        <div className="container mt-5 mb-5">
            <div className="row">
            {renderCards()}
            <div className="col-md-3 col-sm-12">
                <div className="moreBtn">
                <Button className="moreBtn" onClick={() => navigate("/more")}>
                    {/* <FontAwesomeIcon icon={faCaretRight} beat size="2xl" style={{ color: "ffffff" }} /> */}
                    <FontAwesomeIcon icon={faPlus} beat size="2xl" style={{color: "#ffffff",}} />                </Button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default CardList;

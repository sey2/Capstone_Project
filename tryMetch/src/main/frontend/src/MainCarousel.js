import Carousel from 'react-bootstrap/Carousel';

function MainCarousel() {
    return (
        <Carousel variant="dark">
        <Carousel.Item>
            <img
            fluid
            className="d-block w-100 carousel"
            src="https://www.gotokyo.org/kr/story/guide/hanami-guide/images/sg009_1376_1.jpg" height="550"
            alt="First slide"
            />
            <Carousel.Caption>
            <h5 className='slide-one'>안 가면 후회할 숨은 벚꽃 명소 BEST4</h5>
            <p className='slide-font'>여의도 벚꽃 축제, 화명 생태 공원, 대구 이월드 피크닉 블라썸 벚꽃 명소보고 아름다운 봄을 맞이해요!</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            fluid
            className="d-block w-100"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2022_04_10_3020%2Fb861d035-b8d7-11ec-8726-d4f5ef58ac88_01.jpg&type=sc960_832" height="550"
            alt="Second slide"
            />
        <Carousel.Caption>
            <h5 className='slide-one'>무더운 여름날 바닷가</h5>
            <p className='slide-font'>이렇게 더운 날, 집에만 있을 순 없다!</p>
        </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://cdn.imweb.me/upload/S2017101359e025984d346/a2ce839398087.jpg" height="550"
            alt="Third slide"
            />
        <Carousel.Caption>
            <h5 className='slide-one'>잘 맞는 친구와 독일 여행</h5>
            <p className='slide-font'>
            성향이 비슷한 사람끼리, 비슷한 MBTI를 가진 사람끼리 여행 갈 수 있어요
            </p>
        </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}

export default MainCarousel;
 
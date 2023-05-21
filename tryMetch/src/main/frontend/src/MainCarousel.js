import Carousel from 'react-bootstrap/Carousel';

function MainCarousel() {
    return (
        <Carousel variant="dark">
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://www.gotokyo.org/kr/story/guide/hanami-guide/images/sg009_1376_1.jpg" height="550"
            alt="First slide"
            />
            <Carousel.Caption>
            <h5 className='slide-one'>광주 벚꽃 명소 BEST4</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2022_04_10_3020%2Fb861d035-b8d7-11ec-8726-d4f5ef58ac88_01.jpg&type=sc960_832" height="550"
            alt="Second slide"
            />
        <Carousel.Caption>
            <h5 className='slide-one'>무더운 여름날 바닷가</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
            <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
        </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    )
}

export default MainCarousel;
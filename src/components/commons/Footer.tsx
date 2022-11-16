
import Image from 'next/image';
import styled, {css} from 'styled-components';
const Footer = () => {
  return (
    <Wrapper>
      
      <Image src='/img/sumit.png' alt='logo' width={68} height={24} />

      <Row>
        <a
          href="https://github.com/Chanki-Min/sumit-front/tree/main"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image src='/img/github.png' alt='logo' width={31} height={31} />
        </a>
      </Row>
      <p>© SUMIT. 2022 Hongik.univ Computer Engineering graduation project</p>
    </Wrapper>
  );
};
export default Footer;

const Wrapper = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  
  margin-top: 200px;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: small;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 24px;
  margin-top: 20px;
  margin-bottom: 24px;
  & > a {
    z-index: 11;
  }
`;
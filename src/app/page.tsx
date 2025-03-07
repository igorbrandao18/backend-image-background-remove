'use client';

import styled from 'styled-components';
import ImageUploader from '@/components/ImageUploader';
import { ArrowRight, CheckCircle, Zap, Shield, Image as ImageIcon, Sparkles, Clock, CreditCard } from 'lucide-react';

const Container = styled.div`
  max-width: 7xl;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing[12]};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(to right, 
    ${({ theme }) => theme.colors.primary.main}, 
    ${({ theme }) => theme.colors.secondary.main}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 36rem;
  margin: 0 auto;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing[8]};
  margin-bottom: ${({ theme }) => theme.spacing[16]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.primary.main}20;
  background: linear-gradient(to bottom,
    ${({ theme }) => theme.colors.gray[50]}80,
    ${({ theme }) => theme.colors.gray[50]}40
  );
  backdrop-filter: blur(8px);

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(to bottom,
      ${({ theme }) => theme.colors.gray[800]}80,
      ${({ theme }) => theme.colors.gray[800]}40
    );
  }
`;

const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.spacing[12]};
  height: ${({ theme }) => theme.spacing[12]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: linear-gradient(to right bottom,
    ${({ theme }) => theme.colors.primary.main},
    ${({ theme }) => theme.colors.secondary.main}
  );
  color: white;

  svg {
    width: ${({ theme }) => theme.spacing[6]};
    height: ${({ theme }) => theme.spacing[6]};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray[600]};
  font-size: 0.875rem;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export default function Home() {
  return (
    <Container>
      <Header>
        <Title>Remove Background from Images Instantly</Title>
        <Description>
          Transform your images with our professional-grade AI technology. 
          Remove backgrounds with precision in seconds.
        </Description>
      </Header>

      <ImageUploader />
    </Container>
  );
}

'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ImageComparisonProps {
  originalImage: string | null;
  processedImage: string | null;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 1px solid ${({ theme }) => theme.colors.primary.main}20;
  aspect-ratio: 16/9;
`;

const ImageBackground = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjFmMWYxIi8+CiAgPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNmMWYxZjEiLz4KPC9zdmc+');
  background-size: 20px 20px;
  opacity: 0.5;
`;

const ImageContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Badge = styled.div<{ variant: 'original' | 'processed' }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[4]};
  left: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ variant, theme }) => 
    variant === 'original' 
      ? theme.colors.primary.main 
      : theme.colors.secondary.main};
  color: white;
  opacity: 0.9;
  backdrop-filter: blur(4px);
`;

const Message = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 0.875rem;
`;

export default function ImageComparison({ originalImage, processedImage }: ImageComparisonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      {originalImage && (
        <ImageCard>
          <ImageBackground />
          <ImageContent>
            <Image src={originalImage} alt="Original" />
            <Badge variant="original">Original</Badge>
          </ImageContent>
        </ImageCard>
      )}

      {processedImage ? (
        <ImageCard>
          <ImageBackground />
          <ImageContent>
            <Image src={processedImage} alt="Processed" />
            <Badge variant="processed">Processed</Badge>
          </ImageContent>
        </ImageCard>
      ) : originalImage ? (
        <ImageCard>
          <ImageBackground />
          <ImageContent>
            <Message>Ready to process</Message>
          </ImageContent>
        </ImageCard>
      ) : null}
    </Container>
  );
} 
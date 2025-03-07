'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2, X } from 'lucide-react';
import axios from 'axios';
import styled from 'styled-components';
import { Progress } from '@/components/ui/progress';
import ImageComparison from './ImageComparison';

const API_URL = 'http://localhost:8000/api/remove-background';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const UploadArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DropZone = styled.label<{ hasImage: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ theme }) => theme.spacing[80]};
  transition: ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  border: 2px dashed ${({ hasImage, theme }) => 
    hasImage ? theme.colors.success.main : theme.colors.primary.main};
  background-color: ${({ hasImage, theme }) => 
    hasImage ? theme.colors.success.light : theme.colors.primary.light};
  overflow: hidden;

  &:hover {
    background-color: ${({ hasImage, theme }) => 
      hasImage ? theme.colors.success.light : theme.colors.primary.light};
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ hasImage, theme }) => 
      hasImage ? theme.colors.success.dark : theme.colors.primary.dark}30;
    background-color: ${({ hasImage, theme }) => 
      hasImage ? theme.colors.success.dark : theme.colors.primary.dark}10;

    &:hover {
      background-color: ${({ hasImage, theme }) => 
        hasImage ? theme.colors.success.dark : theme.colors.primary.dark}20;
    }
  }
`;

const ImagePreview = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  ${DropZone}:hover & {
    opacity: 1;
  }
`;

const OverlayContent = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
  transform: translateY(${({ theme }) => theme.spacing[4]});
  transition: ${({ theme }) => theme.transitions.default};
  color: white;

  ${DropZone}:hover & {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing[2]};

  svg {
    width: ${({ theme }) => theme.spacing[8]};
    height: ${({ theme }) => theme.spacing[8]};
    margin: 0 auto;
  }
`;

const ErrorContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.error.main}30;
`;

const ErrorBackground = styled.div`
  position: absolute;
  inset: 0;
  background-color: ${({ theme }) => theme.colors.error.light};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.error.dark}30;
  }
`;

const ErrorContent = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ErrorDot = styled.div`
  width: ${({ theme }) => theme.spacing[2]};
  height: ${({ theme }) => theme.spacing[2]};
  margin-top: ${({ theme }) => theme.spacing[2]};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.error.main};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.error.main}80;
  }
`;

const ErrorMessage = styled.div`
  flex: 1;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.error.main};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.error.main}80;
  }
`;

const ErrorButton = styled.button`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.error.main};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.error.dark};
  }

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.error.main}80;

    &:hover {
      color: ${({ theme }) => theme.colors.error.light};
    }
  }
`;

const ProcessingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const ProcessingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const ProcessingText = styled.span`
  font-medium;
  color: ${({ theme }) => theme.colors.gray[700]};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const ProcessingProgress = styled.span`
  font-medium;
  color: ${({ theme }) => theme.colors.primary.main};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.primary.main}80;
  }
`;

const ActionButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[8]}`};
  font-size: 1rem;
  font-weight: 500;
  color: white;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ButtonBackground = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(to right, 
    ${({ theme }) => theme.colors.primary.main}, 
    ${({ theme }) => theme.colors.secondary.main}
  );
`;

const ButtonHoverBackground = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  opacity: 0;
  transition: ${({ theme }) => theme.transitions.default};
  background: linear-gradient(to right, 
    ${({ theme }) => theme.colors.primary.hover}, 
    ${({ theme }) => theme.colors.secondary.hover}
  );

  ${ActionButton}:hover & {
    opacity: 1;
  }
`;

const ButtonContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const PreviewContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii['3xl']};
  border: 1px solid ${({ theme }) => theme.colors.primary.main}30;
`;

const PreviewBackground = styled.div`
  position: absolute;
  inset: 0;
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

const PreviewContent = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing[8]};
`;

const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const PreviewTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[900]};

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const ResetButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[3]}`};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray[700]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.radii.full};
  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }

  svg {
    width: ${({ theme }) => theme.spacing[4]};
    height: ${({ theme }) => theme.spacing[4]};
    margin-right: ${({ theme }) => theme.spacing[1]};
  }

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.gray[300]};
    background-color: ${({ theme }) => theme.colors.gray[800]};

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[700]};
    }
  }
`;

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log('File selected:', selectedFile.name);
      setFile(selectedFile);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('File loaded successfully');
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.onerror = (e) => {
        console.error('Error reading file:', e);
        setError('Error reading file. Please try again.');
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsLoading(true);
      setUploadProgress(0);
      setError(null);
      console.log('Starting upload process...');

      const formData = new FormData();
      formData.append('file', file);

      console.log('Sending request to backend...');
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        withCredentials: false,
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          console.log('Upload progress:', progress);
          setUploadProgress(progress);
        },
      });

      console.log('Response received:', response.data);
      if (response.data.processedImage) {
        setProcessedImage(response.data.processedImage);
      } else {
        throw new Error('No processed image in response');
      }
    } catch (error: any) {
      console.error('Error details:', error.response || error);
      let errorMessage = 'Error processing image. Please try again.';
      
      if (error.response) {
        errorMessage = error.response.data?.detail || error.response.data?.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      const input = document.getElementById('dropzone-file') as HTMLInputElement;
      if (input) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(droppedFile);
        input.files = dataTransfer.files;
        handleFileChange({ target: input } as any);
      }
    }
  };

  const handleReset = () => {
    setFile(null);
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setUploadProgress(0);
    const input = document.getElementById('dropzone-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <Container>
      <UploadArea id="upload">
        <DropZone
          htmlFor="dropzone-file"
          hasImage={!!originalImage}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {originalImage ? (
            <>
              <ImagePreview
                src={originalImage}
                alt="Preview"
              />
              <ImageOverlay>
                <OverlayContent>
                  <IconWrapper>
                    <ImageIcon />
                  </IconWrapper>
                  <p>Click or drag to change image</p>
                </OverlayContent>
              </ImageOverlay>
            </>
          ) : (
            <div>
              <IconWrapper>
                <Upload />
              </IconWrapper>
              <p>Click to upload an image or drag and drop</p>
              <p>PNG, JPG or JPEG (max 10MB)</p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
          />
        </DropZone>
      </UploadArea>

      {error && (
        <ErrorContainer>
          <ErrorBackground />
          <ErrorContent>
            <ErrorDot />
            <ErrorMessage>{error}</ErrorMessage>
            <ErrorButton onClick={() => setError(null)}>
              <X />
            </ErrorButton>
          </ErrorContent>
        </ErrorContainer>
      )}

      {isLoading && (
        <ProcessingContainer>
          <ProcessingHeader>
            <ProcessingText>Processing image...</ProcessingText>
            <ProcessingProgress>{uploadProgress}%</ProcessingProgress>
          </ProcessingHeader>
          <Progress value={uploadProgress} />
        </ProcessingContainer>
      )}

      {file && !isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ActionButton
            onClick={handleUpload}
            disabled={isLoading}
          >
            <ButtonBackground />
            <ButtonHoverBackground />
            <ButtonContent>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Remove Background</span>
                  <Upload />
                </>
              )}
            </ButtonContent>
          </ActionButton>
        </div>
      )}

      {(originalImage || processedImage) && (
        <PreviewContainer>
          <PreviewBackground />
          <PreviewContent>
            <PreviewHeader>
              <PreviewTitle>Image Preview</PreviewTitle>
              <ResetButton onClick={handleReset}>
                <X />
                Reset
              </ResetButton>
            </PreviewHeader>
            <ImageComparison
              originalImage={originalImage}
              processedImage={processedImage}
            />
          </PreviewContent>
        </PreviewContainer>
      )}
    </Container>
  );
} 
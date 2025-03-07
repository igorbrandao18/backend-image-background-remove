'use client';

import * as React from 'react';
import styled from 'styled-components';

interface ProgressProps {
  value?: number;
}

const ProgressRoot = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.radii.full};
  width: 100%;
  height: ${({ theme }) => theme.spacing[3]};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.primary.dark}20;
  }
`;

const ProgressIndicator = styled.div<{ value: number }>`
  width: ${({ value }) => value}%;
  height: 100%;
  background: linear-gradient(to right, 
    ${({ theme }) => theme.colors.primary.main}, 
    ${({ theme }) => theme.colors.secondary.main}
  );
  transition: all 200ms ease-in-out;
`;

export function Progress({ value = 0 }: ProgressProps) {
  return (
    <ProgressRoot>
      <ProgressIndicator value={value} />
    </ProgressRoot>
  );
} 
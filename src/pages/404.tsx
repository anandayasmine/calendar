"use client"
import React from 'react';
import { 
  ContentLayout, 
  NoticeCard 
} from '@/app/components';

export interface IOrderManagementPageProps {
}

export interface IOrderManagementPageState {
}

export default class OrderManagementPage extends React.Component<IOrderManagementPageProps, IOrderManagementPageState> {
  constructor(props: IOrderManagementPageProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <ContentLayout>
        <NoticeCard
          headType={'underConstruction'}
        />
      </ContentLayout>
    );
  }
}

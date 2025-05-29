
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdDashboard from '@/components/ads/AdDashboard';
import AdPostingForm from '@/components/ads/AdPostingForm';
import { Button } from '@/components/ui/button';
import { Plus, List } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'create'>('list');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Kelola iklan kardus bekas Anda
          </p>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'list' ? 'default' : 'outline'}
              onClick={() => setActiveTab('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Iklan Saya
            </Button>
            <Button
              variant={activeTab === 'create' ? 'default' : 'outline'}
              onClick={() => setActiveTab('create')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Buat Iklan Baru
            </Button>
          </div>
        </div>

        {activeTab === 'list' ? (
          <AdDashboard />
        ) : (
          <div className="max-w-2xl mx-auto">
            <AdPostingForm onSuccess={() => setActiveTab('list')} />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

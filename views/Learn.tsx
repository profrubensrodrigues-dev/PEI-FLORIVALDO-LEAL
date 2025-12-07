import React, { useState } from 'react';
import { EDUCATIONAL_TOPICS } from '../constants';
import { Lightbulb, PieChart, Wallet, Scale, BookOpen, TrendingUp, ChevronRight, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Map string icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  Lightbulb,
  PieChart,
  Wallet,
  Scale,
  BookOpen,
  TrendingUp
};

const Learn: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const selectedTopic = EDUCATIONAL_TOPICS.find(t => t.id === selectedTopicId);

  if (selectedTopic) {
    const Icon = IconMap[selectedTopic.icon] || Lightbulb;
    return (
      <div className="animate-fade-in p-6 max-w-4xl mx-auto">
        <button 
          onClick={() => setSelectedTopicId(null)}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 mb-6 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar para tópicos
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
          <div className="bg-emerald-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Icon size={32} />
              </div>
              <h2 className="text-3xl font-bold">{selectedTopic.title}</h2>
            </div>
            <p className="text-emerald-50 text-lg opacity-90">{selectedTopic.summary}</p>
          </div>
          
          <div className="p-8 md:p-12 prose prose-emerald max-w-none">
            <ReactMarkdown 
              components={{
                h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-800 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="text-gray-600 mb-4 leading-relaxed text-lg" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                strong: ({node, ...props}) => <strong className="text-emerald-700 font-semibold" {...props} />,
              }}
            >
              {selectedTopic.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Aprenda a Investir</h1>
        <p className="text-gray-500 text-lg">Selecione um tópico abaixo para começar sua jornada financeira.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EDUCATIONAL_TOPICS.map((topic) => {
          const Icon = IconMap[topic.icon] || Lightbulb;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className="group text-left bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-200 transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6 flex justify-between items-start w-full">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <Icon size={28} />
                </div>
                <div className="bg-gray-50 rounded-full p-2 text-gray-400 group-hover:text-emerald-500 transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {topic.summary}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Learn;
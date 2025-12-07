import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { SimulationResult } from '../types';

const Simulator: React.FC = () => {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(0.8);
  const [months, setMonths] = useState<number>(24);
  const [data, setData] = useState<SimulationResult[]>([]);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [totalInvested, setTotalInvested] = useState<number>(0);

  useEffect(() => {
    calculateResults();
  }, [monthlyContribution, interestRate, months]);

  const calculateResults = () => {
    let currentTotal = 0;
    let investedSum = 0;
    const newData: SimulationResult[] = [];

    // Initial starting point
    newData.push({
        month: 0,
        invested: 0,
        interest: 0,
        total: 0
    });

    for (let i = 1; i <= months; i++) {
      investedSum += monthlyContribution;
      // Formula: (Previous + Contribution) * (1 + rate)
      currentTotal = (currentTotal + monthlyContribution) * (1 + interestRate / 100);
      
      newData.push({
        month: i,
        invested: parseFloat(investedSum.toFixed(2)),
        interest: parseFloat((currentTotal - investedSum).toFixed(2)),
        total: parseFloat(currentTotal.toFixed(2))
      });
    }

    setData(newData);
    setFinalTotal(currentTotal);
    setTotalInvested(investedSum);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Simulador de Juros Compostos</h1>
        <p className="text-gray-500">Veja a mágica do tempo e dos juros agindo sobre o seu dinheiro.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
          <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Parâmetros</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-500" />
                Aporte Mensal (R$)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <input 
                type="range" min="10" max="5000" step="10"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Percent size={16} className="text-emerald-500" />
                Taxa Mensal (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-gray-400 mt-1">Ex: Poupança ~0.5%, CDB/FIIs ~0.8% a 1.0%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-emerald-500" />
                Tempo (Meses)
              </label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
              />
               <input 
                type="range" min="1" max="360" step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-500"
              />
               <p className="text-xs text-gray-400 mt-1">{Math.floor(months / 12)} anos e {months % 12} meses</p>
            </div>
          </div>
        </div>

        {/* Results & Chart */}
        <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Investido</p>
                    <p className="text-xl font-bold text-gray-800">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total em Juros</p>
                    <p className="text-xl font-bold text-emerald-600">+{formatCurrency(finalTotal - totalInvested)}</p>
                </div>
                <div className="bg-emerald-500 p-5 rounded-xl shadow-lg shadow-emerald-200">
                    <p className="text-sm text-emerald-100 mb-1">Resultado Final</p>
                    <p className="text-2xl font-bold text-white">{formatCurrency(finalTotal)}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-96">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Projeção de Crescimento</h3>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="month" 
                            label={{ value: 'Meses', position: 'insideBottomRight', offset: -5 }} 
                            stroke="#94a3b8"
                            fontSize={12}
                        />
                        <YAxis 
                            tickFormatter={(value) => `R$${value/1000}k`}
                            stroke="#94a3b8"
                            fontSize={12}
                        />
                        <Tooltip 
                            formatter={(value: number) => formatCurrency(value)}
                            labelFormatter={(label) => `Mês ${label}`}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="total" 
                            name="Patrimônio Total"
                            stroke="#10b981" 
                            fillOpacity={1} 
                            fill="url(#colorTotal)" 
                            strokeWidth={3}
                        />
                         <Area 
                            type="monotone" 
                            dataKey="invested" 
                            name="Total Aportado"
                            stroke="#64748b" 
                            fillOpacity={1} 
                            fill="url(#colorInvested)" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
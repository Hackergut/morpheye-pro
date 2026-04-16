import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/v1';

export const api = {
  async getMarkets(limit = 30) {
    const { data } = await axios.get(`${API_BASE}/markets?limit=${limit}`);
    return data;
  },

  async getUser(address: string) {
    const { data } = await axios.get(`${API_BASE}/trade/positions/${address}`);
    return data;
  },

  async openTrade(params: {
    user_address: string;
    market_id: string;
    market_question: string;
    side: string;
    price: number;
    size: number;
  }) {
    const { data } = await axios.post(`${API_BASE}/trade/open`, params);
    return data;
  },

  async closeTrade(positionId: number, exitPrice: number) {
    const { data } = await axios.post(`${API_BASE}/trade/close`, {
      position_id: positionId,
      exit_price: exitPrice
    });
    return data;
  }
};

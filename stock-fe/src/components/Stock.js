import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import { useAuth } from "../context/auth";

const Stock = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const { member, setMember } = useAuth();
  const [favStocks, setFavStocks] = useState([]);

  useEffect(() => {
    console.log("Stock", "useEffect []");
    console.log("useEffect[]", data);
    let getStock = async () => {
      let response = await axios.get(`${API_URL}/stocks`);
      setData(response.data);
      console.log("useEffect[] after set", data);
    };
    getStock();
  }, []);

  useEffect(() => {
    let getAllFavoriteStocks = async () => {
      let response = await axios.get(`${API_URL}/member/stocks`, {
        withCredentials: true,
      });
      // console.log('getAllFavoriteStocks', response.data);
      let stocks = response.data.map((item) => item.stock_id);
      setFavStocks(stocks);
      // console.log('getAllFavoriteStocks', stocks);
    };
    if (member) {
      getAllFavoriteStocks();
    }
  }, [member]);

  useEffect(() => {
    console.log("Stock", "useEffect [data]");
    console.log("useEffect[data]", data);
  }, [data]);

  async function handleAddFavorite(stockId) {
    console.log("handleAddFavorite", stockId);
    // axios.post(url[, data[, config]])
    let response = await axios.post(
      `${API_URL}/member/stocks/${stockId}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log("handleAddFavorite", response.data);
    let stocks = response.data.stocks.map((item) => item.stock_id);
    setFavStocks(stocks);
  }

  async function handleRemoveFavorite(stockId) {
    console.log("handleRemoveFavorite", stockId);
    // axios.delete(url[, config])
    let response = await axios.delete(`${API_URL}/member/stocks/${stockId}`, {
      withCredentials: true,
    });
    console.log("handleRemoveFavorite", response.data);
    let stocks = response.data.stocks.map((item) => item.stock_id);
    setFavStocks(stocks);
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      {data.map((stock) => {
        return (
          <div
            key={stock.id}
            className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer"
          >
            <Link to={`/stock/${stock.id}`}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {stock.id}
              </h2>
              <p className="text-gray-700">{stock.name}</p>
              {member ? (
                favStocks.includes(stock.id) ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemoveFavorite(stock.id);
                    }}
                  >
                    取消收藏
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddFavorite(stock.id);
                    }}
                  >
                    收藏
                  </button>
                )
              ) : (
                <></>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;

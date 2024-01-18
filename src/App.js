import React, { useReducer } from "react";
import { collectionData } from "./collection";

//useReducer Hook'unu Kullanma:
//const [state, dispatch] = useReducer(reducer, initialState);
//useReducer hook'unu kullanarak, reducer fonksiyonunu ve başlangıç durumunu içeren bir dizi elde ediyoruz.
//Bu dizi, state adlı mevcut durumu ve dispatch adlı eylem gönderme fonksiyonunu içerir.
// useReducer icin oncelikle initialState: Uygulamanın başlangıç durumunu belirtilmelidir.
//Bu durum, category adlı koleksiyonu (başlangıçta tüm veriyi içeren collectionData) ve activeFilter adlı bir filtreleme durumunu içerir.
const initialState = {
  category: collectionData,
  activeFilter: "All"
};

//useReducer hook'unun çağrılması sırasında kullanılacak olan fonksiyon reducer:.
//Bu fonksiyon, mevcut durumu ve bir eylem nesnesini alır, eyleme göre durumu günceller ve yeni durumu döndürür.
const reducer = (state, action) => {
  // Eylemin tipine göre durumu güncelleyen bir switch-case yapısı kullanalim.
  switch (action.type) {
    case "SET_CATEGORY":
      // Eğer eylem tipi "SET_CATEGORY" ise aşağıdaki adımlar gerçekleşir:
      return {
        // Yeni bir state nesnesi oluştur.
        ...state, // Mevcut state'in tüm özellikleri kopyalanır.
        category: action.payload.category,
        // Yeni state'in "category" özelliği, eylem nesnesinden gelen "category" özelliği ile güncellenir.

        activeFilter: action.payload.activeFilter
        // Yeni state'in "activeFilter" özelliği, eylem nesnesinden gelen "activeFilter" özelliği ile güncellenir.
      };

    default:
      // Eğer eylem tipi yukarıdaki case'lerden hiçbirine uymuyorsa, mevcut state değişmeden geri döndürülür.
      return state;
  }
};

const App = () => {
  // useReducer hook'u kullanarak state ve dispatch fonksiyonunu alıyoruz.
  const [state, dispatch] = useReducer(reducer, initialState);
  // handleBtns fonksiyonu, butonlara tıklandığında çalışan fonksiyon.
  const handleBtns = (word) => {
    let newCategory;
    // "All" butonuna tıklanırsa, tüm veriyi gösteriyoruz.
    if (word === "All") {
      newCategory = collectionData;
    } else {
      // Diğer durumda, filtreleme yaparak sadece belirli kategorideki veriyi gösteriyoruz.
      newCategory = collectionData.filter((item) => item.kind === word);
    }
    // dispatch fonksiyonunu kullanarak, state'i güncelliyoruz.
    dispatch({
      type: "SET_CATEGORY",
      payload: { category: newCategory, activeFilter: word }
    });
  };

  return (
    <>
      <section>
        <div>
          <h2>React Filter</h2>
          <div>
            {/* Kategori butonları ve onClick olayları */}
            <button value="All" onClick={() => handleBtns("All")}>
              All
            </button>
            <button value="Cars" onClick={() => handleBtns("Cars")}>
              Cars
            </button>
            <button value="Views" onClick={() => handleBtns("Views")}>
              Views
            </button>
          </div>
          {/* Kategoriye göre filtrelenmiş veriyi gösterme */}
          <div>
            {state.category.map((item) => (
              <div key={item.id}>
                <div>
                  <img src={item.linkImg} alt={item.name} />
                  <div>
                    <h1>{item.name}</h1>
                    <p>{item.kind}</p>
                    <p>{item.info} </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;

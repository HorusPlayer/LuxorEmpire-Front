import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

export default function CompCarrinho({data, getTotal}) {
    const [prodinfo, setProdInfo] = useState('')
    const [quantidadeItens, setQuantidadeItens] = useState(data.quantd);
    const [total, setTotal] = useState(0)

    async function BuscarInfos() {
        const command = await axios.get(`http://localhost:5000/produto/${data.prodid}`)
        const data2 = command.data;

        setProdInfo(data2);
        setTotal(data2.Preço)
    }

    useEffect(() => {
        BuscarInfos()
        getTotal()
    }, []);



    async function alterarQuantidade(quantidade){
        try {
            const url = `http://localhost:5000/produto/carrinho/alterar/${data.itemid}/${quantidade}`
            const command = await axios.put(url);
            getTotal();
            getTotal();
        }
        catch (err) {
            console.log("err")
        }
    }

    function QuantRemove() {
        if(quantidadeItens == 1) {
            setQuantidadeItens(1);
        }
        else {
            setQuantidadeItens(quantidadeItens-1);
            alterarQuantidade(quantidadeItens-1);
        }
    }

    function QuantAdd() {
        setQuantidadeItens(quantidadeItens+1);
        alterarQuantidade(quantidadeItens+1);
    }
    return (
        <div className='produto'>
            <div id='imgtotal'>

                <div id='img'></div>

                <p>{prodinfo.Nome}</p>

            </div>

                <p id='number'>R$ {prodinfo.Preço}</p>

            <div className='quant'>
                <button className='block' onClick={QuantRemove}> - </button>
                <h1 id='block2'> {quantidadeItens} </h1>
                
                <button className='block' onClick={QuantAdd}> + </button>
            </div>

            <p id='number'>R$ {total* quantidadeItens}</p>

            <button className='exclusao'>Excluir</button>
        </div>
    )
}
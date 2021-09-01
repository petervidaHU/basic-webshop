import { Button } from 'rebass/styled-components';
import styled from 'styled-components';
import { color, layout, flexbox, space, typography, left } from 'styled-system';
import theme from '../../theme/theme';

const CartTable = ({ handleDelete, editable, tableItems }) => {

   return (
      <ThisTable
         p={[1, , 2, , 3]}
         m={1}
         bg="accent"
      >
         <thead >
            <tr>
               <th>name</th>
               <th>price</th>
               <th>qty</th>
               {editable && <th></th>}
            </tr>
         </thead>
         <tbody>
            {tableItems.map(item => (
               <tr key={item.id}>
                  <ThisTd width={"50%"}>{item.name}</ThisTd>
                  <ThisTd width={"20%"}>{item.price}</ThisTd>
                  <ThisTd width={"10%"}>{item.quantity}</ThisTd>
                  {editable && <ThisTd width={"20%"}><Button
                     data-id={item.id}
                     onClick={handleDelete}
                  >
                     del
                  </Button></ThisTd>}

               </tr>
            ))}
         </tbody>
      </ThisTable>
   
   )
};

export default CartTable;

const ThisTable = styled.table`
${color}
${space}
${typography}
width: 50rem;
max-width: 90vw;
text-align: left;

thead {
   //background-color: ${theme.colors.secondary};
}
`;

const ThisTd = styled.td`
${color}
${space}
${typography}
`;
const TableContainer = styled.div`
width:80vw;
`;
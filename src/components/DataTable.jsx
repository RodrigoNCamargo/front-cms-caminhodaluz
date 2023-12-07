import React from 'react';
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import './DataTable.css';
const DataTable = ({
    data,
    entriesOptions = [5, 10, 20],
    entries = 10,
    pagesAmount = 4
}) => {
    return (
        <CDBContainer>
            <CDBCardBody>
                <CDBDataTable
                    noBottomColumn
                    infoLabel={["Mostrando de", "até", "dos", "registros"]}
                    paginationLabel={["Voltar", "Próximo"]}
                    entriesLabel="Número de linhas"
                    searchLabel="Pesquisar"
                    scrollY
                    paging={true}
                    maxHeight="60vh"
                    striped
                    responsiveSm
                    hover
                    searching={false}
                    entriesOptions={entriesOptions}
                    entries={entries}
                    pagesAmount={pagesAmount}
                    data={data}
                />
            </CDBCardBody>
        </CDBContainer>
    );
};

export default DataTable;

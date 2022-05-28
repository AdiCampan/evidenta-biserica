import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useGetMembersQuery, useModifyMemberMutation } from '../../services/members';


function Copil({ dataUpdated, data }) {
  
  const { id } = useParams();
  const { data: persoane, error, isLoading, isFetching } = useGetMembersQuery();
  const [copil, setCopil] = useState('');
  const [dataNasteriiCopil, setDataNasteriiCopil] = useState('');


  useEffect(() => {
    dataUpdated({
      id: data.id,
      child: copil,
      childBirthDate: dataNasteriiCopil,
    });
  }, [copil, dataNasteriiCopil]);

  useEffect(() => {
    setCopil(data?.child || '');
    setDataNasteriiCopil(data?.childBirthDate || '');
  }, [data]);

  const onCopilChange = (person) => {
    if (person.length > 0) {
      setCopil(person[0].id);
    } else {
      setCopil('');
    }
  }


  return (
    <div>
      <Row>
        <Col>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Nume si Prenume</InputGroup.Text>
            <Typeahead
              id="copil"
              onChange={onCopilChange}
              labelKey={option => `${option.firstName} ${option.lastName}`}
              options={persoane || []}
              placeholder="Alege o persoana..."
              selected={persoane?.filter(person => person.id === copil) || []}
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup size="sm" className="mb-3" style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <InputGroup.Text id="inputGroup-sizing-sm">Data Nasterii</InputGroup.Text>
            <DatePicker
              selected={dataNasteriiCopil}
              onChange={(date) => setDataNasteriiCopil(date)}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}

export default Copil;

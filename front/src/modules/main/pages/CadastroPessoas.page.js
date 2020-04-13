import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../../../components/Container';
import StyledButton from '../../../components/StyledButton';
import StyledParagraph from '../../../components/Paragraph';
import Row from '../../../components/Row';
import CampoLineWrapper from '../components/CampoLineWrapper';
import CadastroCampoSelector from '../components/CadastroCampoSelector';
import { colors } from '../../../styles';
import PessoasController from '../../../controllers/Pessoas.controller';
import { dispatchCustomWarning } from '../../../helpers/warningDispatcher';

const StyledContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.grayLight};
`;

const StyledRow = styled(Row)`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin-bottom: 20px;
  justify-content: center;
  padding-right: 50px;
`;

const campos = [
  {
    id: 'nome',
    desc: 'Nome',
    inputType: 'input',
    maxLength: 255,
    isRequired: true,
  },
  {
    id: 'sexo',
    desc: 'Sexo',
    inputType: 'checkgroup',
    options: ['F', 'M'],
  },
  {
    id: 'email',
    desc: 'E-Mail',
    inputType: 'input',
    maxLength: 255,
  },
  {
    id: 'dataNascimento',
    desc: 'Data Nascimento',
    inputType: 'input',
    type: 'date',
    maxLength: 255,
    isRequired: true,
  },
  {
    id: 'nacionalidade',
    desc: 'Nacionalidade',
    inputType: 'input',
    maxLength: 255,
  },
  {
    id: 'naturalidade',
    desc: 'Naturalidade',
    inputType: 'input',
    maxLength: 255,
  },
  {
    id: 'cpf',
    desc: 'CPF',
    placeholder: '000.000.000-00',
    inputType: 'input',
    maxLength: 255,
    isRequired: true,
  },
];

class CadastroPessoas extends React.Component {
  constructor(props) {
    super(props);
    const estado = {
      isLoading: true,
      errors: {},
    };
    campos.forEach(
      campo => {
        estado[campo.id] = campo.defaultValue;
      }
    );
    this.state = estado;
  }

  setCampoValue = (value, campoName) => this.setState({
    [campoName]: value,
  });

  setErrors = errors => this.setState({
    errors,
  });

  setFeedback = (mensagemFeedback, isSuccess = true) => {
    this.setState({
      mensagemFeedback,
      isSuccess,
      isLoading: false,
    });
  }

  setIsLoading = isLoading => {
    this.setState({
      isLoading,
    });
  }

  handleSalvarClick = () => {
    PessoasController.postCriar(this.state).then(
      () => {
        const PessoaCadastradaWarning = {
          type: 'success',
          name: `Pessoa ${this.state.nome} cadastrada com sucesso`,
          message: 'Continue cadastrando outras pessoas ou verifique as que você já criou',
        };
        dispatchCustomWarning(PessoaCadastradaWarning);
        this.props.history.goBack();
      }
    ).catch(
      error => {
        console.log(error);
        console.log(error.response);
        if (error?.response) {
          if (error.response.status === 400) {
            const PessoaCadastradaWarning = {
              type: 'error',
              name: `Campo ${error.response.data.campo} com erro`,
              message: `${error.response.data.erro}`,
            };
            dispatchCustomWarning(PessoaCadastradaWarning);
          } else if (error.response.status === 409) {
            const PessoaCadastradaWarning = {
              type: 'error',
              name: 'Error Finalizando Cadastro',
              message: `${error.response.data}`,
            };
            dispatchCustomWarning(PessoaCadastradaWarning);
          }
        }
      }
    );
  }

  render() {
    const { history } = this.props;
    const { isLoading, errors } = this.state;

    let isFinished = true;
    campos.forEach(
      campo => {
        if (campo.isRequired && this.state[campo.id] === undefined) {
          isFinished = false;
        }
      }
    );

    return (
      <StyledContainer>
        <h1> Cadastro de Pessoas </h1>
        <StyledParagraph>
          Campos com * são obrigatórios
        </StyledParagraph>
        {
          campos.map(
            (campo, i) => (
              <CampoLineWrapper key={campo.id} campo={campo}>
                <CadastroCampoSelector
                  {...campo}
                  tabIndex={0}

                  // onKeyDown={this.handleKeyEnter}
                  setValue={this.setCampoValue}
                  value={this.state[campo.id]}
                  error={errors[campo.id]}
                />
              </CampoLineWrapper>
            )
          )
        }
        <StyledRow>
          <StyledButton disabled={!isFinished} onClick={this.handleSalvarClick}>
            Salvar
          </StyledButton>
        </StyledRow>
      </StyledContainer>
    );
  }
}

CadastroPessoas.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default CadastroPessoas;

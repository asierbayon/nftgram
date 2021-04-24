import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from '../../contexts/AuthStore';
import assetsService from '../../services/assets-service';
import validator from 'validator';
import axios from 'axios';


const validations = {
  contractAddress: (value) => {
    let message;
    if (!value) {
      message = 'The Ethereum contract address is required';
    } else if (!validator.isEthereumAddress(value)) {
      message = 'The Ethereum address is invalid';
    }
    return message;
  },
  tokenId: (value) => {
    let message;
    if (!value) {
      message = 'The token ID is required';
    }
    return message;
  }
}

function AssetForm() {

  const { currentUser } = useContext(AuthContext);
  const history = useHistory();


  const [state, setState] = useState({
    data: {
      contractAddress: '',
      tokenId: ''
    },
    errors: {
      contractAddress: validations.contractAddress(),
      tokenId: validations.tokenId()
    },
    touch: {}
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState(state => ({
      ...state,
      data: {
        ...state.data,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  }

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some(error => errors[error]);
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState(state => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }));
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid()) {
      try {
        const asset = await axios.get(`https://api.opensea.io/api/v1/asset/${state.data.contractAddress}/${state.data.tokenId}/`);
        console.log(asset)
        const newAsset = {
          title: asset.data.name,
          image: asset.data.image_url,
          assetContractAddress: asset.data.asset_contract.address,
          tokenId: asset.data.token_id,
          url: asset.data.permalink,
          owner: currentUser.id
        }
        assetsService.upload(newAsset);
        history.push('/');
        
      } catch (error) {
        const { message, errors } = error.response ? error.response.data : error;
        console.error(message);
        setState(state => ({
          ...state,
          errors: errors
        }))
      }
    }
  }

  const { data, errors, touch } = state;

  return (
    <form className="mt-3 mb-3" onSubmit={handleSubmit}>

      <div className="form-floating mb-3">
        <input type="text" id="contractAddress" placeholder="name@example.com"
          name="contractAddress" className={`form-control ${touch.contractAddress && errors.contractAddress ? 'is-invalid' : ''}`}
          onChange={handleChange} onBlur={handleBlur} value={data.contractAddress} />
        <label htmlFor="contractAddress">Contract Address</label>
        <div className="invalid-feedback">{errors.contractAddress}</div>
      </div>

      <div className="form-floating mb-3">
        <input type="text" id="tokenId" name="tokenId"
          className={`form-control ${touch.tokenId && errors.tokenId ? 'is-invalid' : ''}`}
          placeholder="Token ID" onChange={handleChange} onBlur={handleBlur} value={data.tokenId} />
        <label htmlFor="tokenId">Token ID</label>
        <div className="invalid-feedback">{errors.tokenId}</div>
      </div>

      <div className="d-grid">
        <button className="btn btn-primary p-2 fw-bold" type="submit">Upload asset</button>
      </div>

    </form>
  )
}

export default AssetForm;

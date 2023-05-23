import '../pages/index.css';

import {api} from '../components/Api.js'



api.getInitialProfile()
.then(res => console.log(res));
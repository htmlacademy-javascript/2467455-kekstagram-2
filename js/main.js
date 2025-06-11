import './util.js';
import {getPhotoDescriptions} from './data.js';
import {renderThumbnails} from './render.js';

const photoDescriptions = getPhotoDescriptions();
renderThumbnails(photoDescriptions);


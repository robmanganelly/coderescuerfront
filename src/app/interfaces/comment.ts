export interface Comment {
// author: string;
source: string;
date?: Date;
text: string;
author: { _id: string, username: string};
}




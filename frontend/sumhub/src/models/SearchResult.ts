export interface SearchResult {
    data:  Paper;
    score: number;
}

export interface Paper {
    id:          string;
    title:       string;
    authors:     string[];
    abstract:    string;
    publishDate: Date;
    category:    string;
    url:         string;
    subjects:    string[];
    links:       Link[];
}

export interface Link {
    type: string;
    url:  string;
}

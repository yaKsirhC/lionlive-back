export type User = UserData & UserInfo

export interface UserData {
	name: string,
	email: string,

	qoinBalance: number,
	isVIP: boolean,
	matches: User[],
	conversations: Conversation[],

	password: string,
	createdAt: Date
}

export interface Conversation {
	recipient: string,
	sender: string,
	message: string,

	sentAt: string,
}

export interface webRTCPeerConfiguration {
	filters: Matchfilters,
	requestor: UserInfoRTC
}

export interface UserInfoRTC {
	birthDate: Date,
	gender?: string,
	location: string,
	videoType?: "solo" | "duo"
}


export interface UserInfo {
	birthDate: Date,
	gender: string,
	location: string,
}

export interface Matchfilters {
	// Age Range (milliseconds)
	age?: number[],
	region?: string,
	gender?: string,

}
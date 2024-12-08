import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SignApiResponse, TFavoriteItem } from "../../../../lib/types";
import { FavApiResponse } from "../../api/modules/favorite.api";

type UserState = {
  user: SignApiResponse | null;
  listFavorites: TFavoriteItem[] | null;
};

const initialState: UserState = {
  user: null,
  listFavorites: [],
};
export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SignApiResponse | null>) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.access_token)
          localStorage.setItem("actkn", action.payload.access_token);
      }

      state.user = action.payload;
    },
    setListFavorites: (state, action: PayloadAction<TFavoriteItem[]>) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<{ mediaId: number }>) => {
      const { mediaId } = action.payload;
      if (!state.listFavorites) return;
      state.listFavorites = state.listFavorites.filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },

    addFavorite: (state, action: PayloadAction<FavApiResponse>) => {
      if (!state.listFavorites) {
        return;
      } else {
        state.listFavorites = [action.payload, ...state.listFavorites];
      }
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUser.pending, () => {})
  //     .addCase(
  //       getUser.fulfilled,
  //       (state, action: PayloadAction<SignApiResponse | null>) => {
  //         state.user = action.payload;
  //       }
  //     );
  // },
});

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (user: SignApiResponse) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return user;
//   }
// );

export const { setUser, setListFavorites, addFavorite, removeFavorite } =
  userSlice.actions;

export default userSlice.reducer;

import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { countPagesFn, getNotesFn } from "./api/noteApi";
import NoteModal from "./components/note.modal";
import CreateNote from "./components/notes/create.note";
import NoteItem from "./components/notes/note.component";
import NProgress from "nprogress";
import Pagination from './components/pagination/pagination';
import './App.css'

export function loadNotesFn(page: number, limit: number) {

  const {
    data: notes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getNotes"],
    queryFn: () => getNotesFn(page,limit),
    staleTime: 5 * 1000,
    select: (data) => data.data.notes,
    onSuccess() {
      NProgress.done();
    },
    onError(error: any) {
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
      NProgress.done();
    },
  });
  

  useEffect(() => {
    if (isLoading || isFetching) {
      NProgress.start();
    }
  }, [isLoading, isFetching]);

  return notes;
}

function getLastPage(pageLimit: number): number {
  const {
    data: lastPage,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["countPages"],
    queryFn: () => countPagesFn(pageLimit),
    staleTime: 5 * 1000,
    select: (data) => data.results,
    onSuccess() {
      NProgress.done();
    },
    onError(error: any) {
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
      NProgress.done();
    },
  });

  if(lastPage==undefined)
  return 1;
 
  return lastPage;

}


function AppContent() {
  const limitNotesPerPage: number = 10;
  
  const [openNoteModal, setOpenNoteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  
  const [notes, setNotes] = useState(loadNotesFn(currentPage,limitNotesPerPage));

  const setCurrentPageEvent = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  useEffect(function effectFunction() {
    getNotesFn(currentPage,limitNotesPerPage).then(res =>
      {setNotes(res.data.notes)})
  }, [currentPage]);

  const lastPage =  getLastPage(limitNotesPerPage);
 
  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7 grid-rows-[1fr]">
        <div className="p-4 min-h-[18rem] bg-white rounded-lg border border-gray-200 shadow-md flex flex-col items-center justify-center">
          <div
            onClick={() => setOpenNoteModal(true)}
            className="flex items-center justify-center h-20 w-20 border-2 border-dashed border-ct-blue-600 rounded-full text-ct-blue-600 text-5xl cursor-pointer"
          >
            <i className="bx bx-plus"></i>
          </div>
          <h4
            onClick={() => setOpenNoteModal(true)}
            className="text-lg font-medium text-ct-blue-600 mt-5 cursor-pointer"
          >
            Add new note
          </h4>
        </div>
        {/* Note Items */}

        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}

        {/* Create Note Modal */}
        <NoteModal
          openNoteModal={openNoteModal}
          setOpenNoteModal={setOpenNoteModal}
        >
          <CreateNote setOpenNoteModal={setOpenNoteModal} />
        </NoteModal>
      </div>
      <div className="container">
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        maxLength={7}
        setCurrentPage={setCurrentPageEvent}
      />
    </div>
    </div>
  );
}

function App(this: any) {
  const [queryClient] = useState(() => new QueryClient());
 
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContent/>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;

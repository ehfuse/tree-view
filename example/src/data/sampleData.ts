import type { TreeItem } from "@ehfuse/tree-view";

export const sampleData: TreeItem[] = [
    {
        id: "1",
        label: "게시판 관리",
        children: [
            {
                id: "1-1",
                label: "공지사항",
                parentId: "1",
                remark: "중요",
                children: [
                    { id: "1-1-1", label: "공지사항 조회", parentId: "1-1" },
                    { id: "1-1-2", label: "공지사항 쓰기", parentId: "1-1" },
                    { id: "1-1-3", label: "공지사항 수정", parentId: "1-1" },
                    { id: "1-1-4", label: "공지사항 삭제", parentId: "1-1" },
                ],
            },
            {
                id: "1-2",
                label: "자유게시판",
                parentId: "1",
                children: [
                    { id: "1-2-1", label: "자유게시판 조회", parentId: "1-2" },
                    { id: "1-2-2", label: "자유게시판 쓰기", parentId: "1-2" },
                    { id: "1-2-3", label: "자유게시판 수정", parentId: "1-2" },
                    { id: "1-2-4", label: "자유게시판 삭제", parentId: "1-2" },
                ],
            },
            {
                id: "1-3",
                label: "FAQ",
                parentId: "1",
                children: [
                    { id: "1-3-1", label: "FAQ 조회", parentId: "1-3" },
                    { id: "1-3-2", label: "FAQ 쓰기", parentId: "1-3" },
                    { id: "1-3-3", label: "FAQ 수정", parentId: "1-3" },
                    { id: "1-3-4", label: "FAQ 삭제", parentId: "1-3" },
                ],
            },
        ],
    },
    {
        id: "1-2",
        label: "자유게시판",
        children: [
            { id: "1-2-1", label: "자유게시판 조회", parentId: "1-2" },
            { id: "1-2-2", label: "자유게시판 쓰기", parentId: "1-2" },
            { id: "1-2-3", label: "자유게시판 수정", parentId: "1-2" },
            { id: "1-2-4", label: "자유게시판 삭제", parentId: "1-2" },
        ],
    },
    {
        id: "2",
        label: "회원 관리",
        children: [
            {
                id: "2-1",
                label: "회원 정보",
                parentId: "2",
                children: [
                    { id: "2-1-1", label: "회원 목록 조회", parentId: "2-1" },
                    { id: "2-1-2", label: "회원 상세 조회", parentId: "2-1" },
                    { id: "2-1-3", label: "회원 정보 수정", parentId: "2-1" },
                    { id: "2-1-4", label: "회원 삭제", parentId: "2-1" },
                ],
            },
            {
                id: "2-2",
                label: "권한 관리",
                parentId: "2",
                remark: "Admin",
                children: [
                    { id: "2-2-1", label: "권한 조회", parentId: "2-2" },
                    { id: "2-2-2", label: "권한 생성", parentId: "2-2" },
                    { id: "2-2-3", label: "권한 수정", parentId: "2-2" },
                    { id: "2-2-4", label: "권한 삭제", parentId: "2-2" },
                ],
            },
        ],
    },
    {
        id: "3",
        label: "시스템 관리",
        children: [
            {
                id: "3-1",
                label: "코드 관리",
                parentId: "3",
                remark: "공통코드",
                children: [
                    { id: "3-1-1", label: "코드 조회", parentId: "3-1" },
                    { id: "3-1-2", label: "코드 등록", parentId: "3-1" },
                    { id: "3-1-3", label: "코드 수정", parentId: "3-1" },
                    { id: "3-1-4", label: "코드 삭제", parentId: "3-1" },
                ],
            },
            {
                id: "3-2",
                label: "메뉴 관리",
                parentId: "3",
                children: [
                    { id: "3-2-1", label: "메뉴 조회", parentId: "3-2" },
                    { id: "3-2-2", label: "메뉴 등록", parentId: "3-2" },
                    { id: "3-2-3", label: "메뉴 수정", parentId: "3-2" },
                    { id: "3-2-4", label: "메뉴 삭제", parentId: "3-2" },
                ],
            },
            {
                id: "3-3",
                label: "로그 관리",
                parentId: "3",
                remark: "시스템",
                children: [
                    { id: "3-3-1", label: "접속 로그 조회", parentId: "3-3" },
                    { id: "3-3-2", label: "작업 로그 조회", parentId: "3-3" },
                    { id: "3-3-3", label: "에러 로그 조회", parentId: "3-3" },
                ],
            },
        ],
    },
];

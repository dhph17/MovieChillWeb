/* eslint-disable react/display-name */
import React from "react";
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    offset,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
    useMergeRefs,
    useRole,
    useTypeahead
} from "@floating-ui/react";
import {
    Link
} from "react-router-dom";

import './styles.scss'

const MenuContext = React.createContext({
    getItemProps: (userProps) => ({}),
    activeIndex: null,
    setActiveIndex: () => { },
    setHasFocusInside: () => { },
    isOpen: false
});

const MenuComponent = React.forwardRef(
    ({ children, label, onMenuClick, ...props }, forwardedRef) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [hasFocusInside, setHasFocusInside] = React.useState(false);
        const [activeIndex, setActiveIndex] = React.useState(null);

        const elementsRef = React.useRef([]);
        const labelsRef = React.useRef([]);
        const parent = React.useContext(MenuContext);

        const tree = useFloatingTree();
        const nodeId = useFloatingNodeId();
        const parentId = useFloatingParentNodeId();
        const item = useListItem();

        const isNested = parentId != null;

        const { floatingStyles, refs, context } = useFloating({
            nodeId,
            open: isOpen,
            onOpenChange: (open) => {
                setIsOpen(open);
                if (open && onMenuClick) {
                    onMenuClick(); // Trigger the API call when the menu is opened
                }
            },
            placement: isNested ? "right-start" : "bottom-start",
            middleware: [
                offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }),
                flip(),
                shift()
            ],
            whileElementsMounted: autoUpdate
        });

        const hover = useHover(context, {
            enabled: isNested,
            delay: { open: 75 },
            handleClose: safePolygon({ blockPointerEvents: true })
        });
        const click = useClick(context, {
            event: "mousedown",
            toggle: !isNested,
            ignoreMouse: isNested
        });
        const role = useRole(context, { role: "menu" });
        const dismiss = useDismiss(context, { bubbles: true });
        const listNavigation = useListNavigation(context, {
            listRef: elementsRef,
            activeIndex,
            nested: isNested,
            onNavigate: setActiveIndex
        });
        const typeahead = useTypeahead(context, {
            listRef: labelsRef,
            onMatch: isOpen ? setActiveIndex : undefined,
            activeIndex
        });

        const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([hover, click, role, dismiss, listNavigation, typeahead]);

        React.useEffect(() => {
            if (!tree) return;

            function handleTreeClick() {
                setIsOpen(false);
            }

            function onSubMenuOpen(event) {
                if (event.nodeId !== nodeId && event.parentId === parentId) {
                    setIsOpen(false);
                }
            }

            tree.events.on("click", handleTreeClick);
            tree.events.on("menuopen", onSubMenuOpen);

            return () => {
                tree.events.off("click", handleTreeClick);
                tree.events.off("menuopen", onSubMenuOpen);
            };
        }, [tree, nodeId, parentId]);

        React.useEffect(() => {
            if (isOpen && tree) {
                tree.events.emit("menuopen", { parentId, nodeId });
            }
        }, [tree, isOpen, nodeId, parentId]);

        return (
            <FloatingNode id={nodeId}>
                <button
                    ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
                    tabIndex={!isNested ? undefined : parent.activeIndex === item.index ? 0 : -1}
                    role={isNested ? "menuitem" : undefined}
                    data-open={isOpen ? "" : undefined}
                    data-nested={isNested ? "" : undefined}
                    data-focus-inside={hasFocusInside ? "" : undefined}
                    className={isNested ? "MenuItem" : "RootMenu"}
                    {...getReferenceProps(
                        parent.getItemProps({
                            ...props,
                            onFocus(event) {
                                props.onFocus?.(event);
                                setHasFocusInside(false);
                                parent.setHasFocusInside(true);
                            }
                        })
                    )}
                >
                    {label}
                    {isNested && (
                        <span aria-hidden style={{ marginLeft: 10, fontSize: 10 }}>
                            ▶
                        </span>
                    )}
                </button>
                <MenuContext.Provider
                    value={{
                        activeIndex,
                        setActiveIndex,
                        getItemProps,
                        setHasFocusInside,
                        isOpen
                    }}
                >
                    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                        {isOpen && (
                            <FloatingPortal>
                                <FloatingFocusManager
                                    context={context}
                                    modal={false}
                                    initialFocus={isNested ? -1 : 0}
                                    returnFocus={!isNested}
                                >
                                    <div
                                        ref={refs.setFloating}
                                        className="Menu"
                                        style={floatingStyles}
                                        {...getFloatingProps()}
                                    >
                                        {children}
                                    </div>
                                </FloatingFocusManager>
                            </FloatingPortal>
                        )}
                    </FloatingList>
                </MenuContext.Provider>
            </FloatingNode>
        );
    }
);

const MenuItem = React.forwardRef(({ to, label, disabled, ...props }, forwardedRef) => {
    const menu = React.useContext(MenuContext);
    const item = useListItem({ label: disabled ? null : label });
    const tree = useFloatingTree();
    const isActive = item.index === menu.activeIndex;

    return (
        <Link
            {...props}
            to={to}
            ref={useMergeRefs([item.ref, forwardedRef])}
            type="button"
            role="menuitem"
            className="MenuItem"
            tabIndex={isActive ? 0 : -1}
            disabled={disabled}
            {...menu.getItemProps({
                onClick(event) {
                    props.onClick?.(event);
                    tree?.events.emit("click");
                },
                onFocus(event) {
                    props.onFocus?.(event);
                    menu.setHasFocusInside(true);
                }
            })}
        >
            {label}
        </Link>
    );
});

const Menu = React.forwardRef((props, ref) => {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <MenuComponent {...props} ref={ref} />
            </FloatingTree>
        );
    }

    return <MenuComponent {...props} ref={ref} />;
});

export { Menu, MenuItem };
